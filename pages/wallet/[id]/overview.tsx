import React, {useEffect, useState} from "react";
import {useRouter} from 'next/router'
import Seo from "@components/Seo";

import {useDispatch} from "react-redux";
import {uiActions} from "@store/reducers/ui-slice";
import {fetchTranslations} from "@services/translations";
import MotionWrap from "@components/UI/Motion";
import {walletOverviewNavigation} from "@constants/navigation";
import {endOfMonth, startOfMonth} from "date-fns";
import {
    dateToYMDShort, filterByType,
    formatNumber,
    getDateParam,
    groupByCategory,
    sumOtherTransactions,
    sumTransactions
} from "@utils/index";
import useFetchWalletTransactions from "@hooks/useFetchWalletTransactions";
import Skeleton from "react-loading-skeleton";
import withAuth from "@components/HOC/withAuth";
import Section from "@components/Section";
import {
    StyledAmount,
    StyledCategoryColumn,
    StyledCategoryIcon,
    StyledCategoryName, StyledTransactionColumn
} from "@components/Section/variants/TransactionsSection/components/Transaction/style";
import styled from "styled-components";
import WalletFilterSection from "@components/Section/variants/WalletFilterSection";
import WalletContext from "@contexts/wallet";
import useFetchWallet from "@hooks/useFetchWallet";

import PeriodPie from "@components/UI/Charts/variants/PeriodPie";
import ChangeBar from "@components/UI/Charts/variants/ChangeBar";

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = async ({locale}: { locale: string }) => {

    return {
        props: {
            messages: await fetchTranslations(locale),
            "title": "Wallet overview",
        }
    }
}

const StyledGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-auto-columns: 1fr;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const WalletOverview = () => {
    const router = useRouter()
    const {id} = router.query
    const dispatch = useDispatch()
    const {wallet} = useFetchWallet(id)
    const [startDate, setStartDate] = useState(getDateParam(router.query, 'from', startOfMonth(new Date())));
    const [endDate, setEndDate] = useState(getDateParam(router.query, 'to', endOfMonth(new Date())));
    const {transactions} = useFetchWalletTransactions(id, {
        from: dateToYMDShort(startDate),
        to: dateToYMDShort(endDate),
    })

    useEffect(() => {
        dispatch(uiActions.setNavItems(walletOverviewNavigation(`${id}`)))
    }, [dispatch, id])

    let content = <Skeleton/>

    if (transactions) {

        const incomeTransactions = filterByType(transactions, 'income')
        const expenseTransactions = filterByType(transactions, 'expense')

        // @ts-ignore
        const incomeTransactionsGrouped = groupByCategory(incomeTransactions)
        const expenseTransactionsGrouped = groupByCategory(expenseTransactions)

        content = <>

            <WalletFilterSection startDate={startDate} setStartDate={setStartDate} endDate={endDate}
                                 setEndDate={setEndDate}/>

            <StyledGrid>
                <Card title="Changes">
                    <div style={{height: '300px', width: '100%', display: "flex", justifyContent: 'center'}}>
                        <ChangeBar wallet={wallet} transactions={transactions} startDate={startDate} endDate={endDate}/>
                    </div>
                </Card>

                <Table title="Period Expenses" transactions={expenseTransactionsGrouped}/>
                <Table title="Period Income" transactions={incomeTransactionsGrouped}/>

            </StyledGrid>
        </>
    }

    return (
        <>
            <Seo title="Wallet Overview"/>
            <MotionWrap>
                <WalletContext.Provider value={{wallet}}>
                    <Section title={"Overview"}>
                        {content}
                    </Section>
                </WalletContext.Provider>
            </MotionWrap>
        </>
    )
}

interface ITable {
    transactions: any;
    title: string;
    period?: string;
}

export const Card = (props: any) => {
    return (
        <div style={{minHeight: '0', backgroundColor: 'white', borderRadius: '0.5rem', flex: '1 1 50%'}}>
            <div style={{padding: '1rem'}}>
                <div>
                    <h1 style={{fontWeight: '600', fontSize: '16px'}}>{props.title}</h1>
                </div>
                <div style={{paddingTop: '1rem'}}>
                    {props.children}
                </div>

            </div>
        </div>
    )
}

export const Table = ({transactions, title}: ITable) => {

    const tempTransactions = Object.keys(transactions).map((item) => {
        return {
            "category": transactions[item].category,
            "transactions": transactions[item].transactions,
            "total": sumTransactions(transactions[item].transactions)
        }
    })

    const orderTransactions = tempTransactions.sort((a, b) => a.total - b.total)

    return (
        <Card title={title}>
            <div style={{paddingTop: '1rem'}}>
                <div style={{height: '300px', width: '100%', display: "flex", justifyContent: 'center'}}>
                    <PeriodPie transactions={transactions}/>
                </div>
            </div>

            {transactions &&
                orderTransactions.map(item => <Row
                    key={item.category?.id} item={item}/>)
            }
        </Card>
    )
}

const Row = ({item}: { item: any }) => {

    const router = useRouter()

    const transactions = item.transactions
    const count = transactions.length
    const category = item.category

    const total = sumTransactions(transactions)
    const transaction = transactions[0]
    let otherTotal = 0
    if (transaction.otherCurrency) {
        otherTotal = sumOtherTransactions(transactions)
    }

    return (
        <div style={{display: 'flex'}}>
            <StyledCategoryColumn>
                <StyledCategoryIcon color={category.hex}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={category.icon} alt={"..."}/>
                </StyledCategoryIcon>
                <StyledCategoryName hideOnMobile={true}>
                    {category.name}
                </StyledCategoryName>
            </StyledCategoryColumn>
            <StyledTransactionColumn useFlex={true}>
                {transactions.length} transaction{count > 1 && 's'}
            </StyledTransactionColumn>
            <StyledTransactionColumn useFlex={true}>
                <StyledAmount
                    negative={category.type === "expense"}>{category.type === "income" && '+'}{formatNumber(total, router.locale, transaction.currency)}</StyledAmount>
                {transaction.otherCurrency &&
                    <StyledAmount
                        other={true}>{category.type === "income" && '+'}{formatNumber(otherTotal, router.locale, transaction.otherCurrency.currency)}</StyledAmount>}
            </StyledTransactionColumn>
        </div>
    )
}

export default withAuth(WalletOverview)
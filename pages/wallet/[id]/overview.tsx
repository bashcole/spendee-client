import React, {useEffect, useState} from "react";
import {useRouter} from 'next/router'

import {motion} from "framer-motion";
import {variants} from "@constants/motion-variants";
import Seo from "@components/Seo";

import {useDispatch} from "react-redux";
import {uiActions} from "@store/reducers/ui-slice";
import {fetchTranslations} from "@services/translations";
import MotionWrap from "@components/UI/Motion";
import {walletOverviewNavigation} from "@constants/navigation";
import {endOfMonth, startOfMonth} from "date-fns";
import {
    dateToYMDShort,
    formatNumber,
    getDateParam,
    groupByCategory,
    sumOtherTransactions,
    sumTransactions
} from "@utils/index";
import useFetchWalletTransactions from "@hooks/useFetchWalletTransactions";
import Skeleton from "react-loading-skeleton";
import withAuth from "@components/HOC/withAuth";
import {log} from "util";
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
  grid-auto-rows: 1fr;
  grid-auto-columns: 1fr;
  grid-template-columns: repeat( auto-fit, minmax(280px, 1fr) );
  align-items: flex-start
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
        console.log(`ID: ${id}`)
        console.log(walletOverviewNavigation(`${id}`))
        dispatch(uiActions.setNavItems(walletOverviewNavigation(`${id}`)))
    }, [dispatch, id])

    let content = <Skeleton/>

    if (transactions) {

        const incomeTransactions = transactions.filter(transaction => transaction.category.type === 'income')
        const expenseTransactions = transactions.filter(transaction => transaction.category.type === 'expense')

        // @ts-ignore
        const incomeTransactionsGrouped = groupByCategory(incomeTransactions)
        const expenseTransactionsGrouped = groupByCategory(expenseTransactions)

        content = <>

            <WalletFilterSection startDate={startDate} setStartDate={setStartDate} endDate={endDate}
                                 setEndDate={setEndDate}/>

            <StyledGrid>
                <Table title="Period Income" transactions={incomeTransactionsGrouped}/>
                <Table title="Period Expenses" transactions={expenseTransactionsGrouped}/>
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

export const Table = ({transactions, title, period}: ITable) => {
    return (
        <div style={{minHeight: '0', backgroundColor: 'white', borderRadius: '0.5rem'}}>
            <div style={{padding: '1rem'}}>
                <div>
                    <h1 style={{fontWeight: '600', fontSize: '16px'}}>{title}</h1>
                    <span style={{color: '#bbcdd8', fontSize: '12px'}}>Jan 01–Dec 31</span>
                </div>
                <div style={{paddingTop: '1rem'}}>
                    {transactions &&
                        Object.keys(transactions).map(item => <Row
                            key={transactions[item].category?.id} item={transactions[item]}/>)
                    }

                </div>

            </div>
        </div>
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
    if(transaction.otherCurrency){
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
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
import {dateToYMDShort, getDateParam, groupByCategory} from "@utils/index";
import useFetchWalletTransactions from "@hooks/useFetchWalletTransactions";
import Skeleton from "react-loading-skeleton";
import withAuth from "@components/HOC/withAuth";
import {log} from "util";
import Section from "@components/Section";
import {
    StyledCategoryColumn,
    StyledCategoryIcon,
    StyledCategoryName
} from "@components/Section/variants/TransactionsSection/components/Transaction/style";

// noinspection JSUnusedGlobalSymbols
export const getStaticProps = async ({locale}: { locale: string }) => {

    return {
        props: {
            messages: await fetchTranslations(locale),
            "title": "Edit wallet",
        }
    }
}

export async function getStaticPaths() {
    return {paths: [], fallback: false }
}

const WalletOverview = () => {
    const router = useRouter()
    const {id} = router.query
    const dispatch = useDispatch()

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
            <div style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: '1fr 1fr'
            }}>
                <Table title="Period Income" transactions={incomeTransactionsGrouped}/>
                <Table title="Period Expenses" transactions={expenseTransactionsGrouped}/>
            </div>
        </>
    }

    return (
        <>
            <Seo title="Wallet Overview"/>
            <MotionWrap>
                <Section title={"Overview"}>
                    {content}
                </Section>
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
        <div style={{height: '200px', backgroundColor: 'white', borderRadius: '0.5rem'}}>
            <div style={{padding: '1rem'}}>
                <div>
                    <h1 style={{fontWeight: '600', fontSize: '16px'}}>{title}</h1>
                    <span style={{color: '#bbcdd8', fontSize: '12px'}}>Jan 01–Dec 31</span>
                </div>
                <div>
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
    const transactions = item.transactions
    const count = transactions.length
    const category = item.category

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
            <StyledCategoryColumn>
                # {transactions.length} transaction{count > 1 && 's'}
            </StyledCategoryColumn>
        </div>
    )
}

export default withAuth(WalletOverview)
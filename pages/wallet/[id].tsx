import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {NextPage} from "next";
import {useRouter} from 'next/router'
import Router from 'next/router';

import Seo from "@components/Seo";
import {uiActions} from "@store/reducers/ui-slice";
import withAuth from "@components/HOC/withAuth";
import {fetchTranslations} from "@services/translations";
import {dateToYMDShort, portfolioCurrencies, toQueryString} from "@utils/index";
import {endOfMonth, startOfMonth} from "date-fns";
import MotionWrap from "@components/UI/Motion";
import PortfolioActionsSection from "@components/Section/variants/PortfolioActionsSection";
import WalletActionsSection from "@components/Section/variants/WalletActionsSection";
import useFetchWallet from "@hooks/useFetchWallet";
import WalletTotalsAccordionSection from "@components/AccordionSection/variants/WalletTotalsAccordionSection";
import useFetchWalletTransactions from "@hooks/useFetchWalletTransactions";
import PositionsSection from "@components/Section/variants/PositionsSection";
import TransactionsSection from "@components/Section/variants/TransactionsSection";
import WalletFilterSection from "@components/Section/variants/WalletFilterSection";
import {walletNavigation} from "@constants/navigation";
import useFetchCategories from "@hooks/useFetchCategories";
import WalletContext from "@contexts/wallet";
import {walletActions} from "@store/reducers/wallet-slice";
import useFetchWalletPositions from "@hooks/useFetchWalletPositions";
import useFetchCurrencies from "@hooks/useFetchCurrencies";

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = async ({locale}: { locale: string }) => {

    return {
        props: {
            messages: await fetchTranslations(locale),
            "title": "Edit wallet...",
        }
    }
}

interface IQuery {
    [key: string]: any | undefined
}

const getDateParam = (query: IQuery, key: string, defaultValue: Date) => {
    if (query.hasOwnProperty(key)) {
        return new Date(query[key])
    }
    return defaultValue;
}

const Wallet: NextPage = (props: any) => {

    const router = useRouter()
    const {id} = router.query
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(getDateParam(router.query, 'from', startOfMonth(new Date())));
    const [endDate, setEndDate] = useState(getDateParam(router.query, 'to', endOfMonth(new Date())));
    const {categories} = useFetchCategories()
    const {wallet} = useFetchWallet(id)
    const {transactions} = useFetchWalletTransactions(id, {
        from: dateToYMDShort(startDate),
        to: dateToYMDShort(endDate),
    })
    const {currencies} = useFetchCurrencies()

    const {positions} = useFetchWalletPositions(id, {
        from: dateToYMDShort(startDate),
        to: dateToYMDShort(endDate),
    })

    useEffect(() => {
        const query = {...Router.query}
        const params = {
            from: dateToYMDShort(startDate),
            to: dateToYMDShort(endDate),
        }
        dispatch(walletActions.updateQuery(toQueryString(params)))
        Router.replace({
                pathname: `${Router.pathname}`,
                query: {
                    ...query,
                    from: dateToYMDShort(startDate), // override the color property
                    to: dateToYMDShort(endDate) // override the color property
                },
            },
            undefined,
            {shallow: true}).then(r => '');
    }, [startDate, endDate, dispatch])

    useEffect(() => {
        dispatch(uiActions.setNavItems(walletNavigation(`${id}`, wallet?.type)))
    }, [dispatch, id, wallet?.type])

    return (
        <>
            <Seo title="Transactions"/>
            <MotionWrap>
                <WalletContext.Provider value={{categories, wallet, currencies}}>
                    {wallet?.type === 'cash' &&
                        <>
                            <WalletActionsSection/>
                            <WalletTotalsAccordionSection transactions={transactions}/>
                        </>
                    }
                    {wallet?.type === 'portfolio' &&
                        <PortfolioActionsSection/>
                    }

                    <WalletFilterSection startDate={startDate} setStartDate={setStartDate} endDate={endDate}
                                         setEndDate={setEndDate}/>

                    {wallet?.type === 'cash' && <TransactionsSection transactions={transactions}/>}
                    {wallet?.type === 'portfolio' && <PositionsSection positions={positions}/>}
                </WalletContext.Provider>
            </MotionWrap>
        </>
    )
}

export default withAuth(Wallet)
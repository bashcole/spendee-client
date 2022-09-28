import {useEffect} from "react";
import {useDispatch} from "react-redux";

import Seo from "@components/Seo";
import withAuth from "@components/HOC/withAuth";
import MotionWrap from "@components/UI/Motion";
import WalletsSection from "@components/Section/variants/WalletsSection";
import WalletContext from "@contexts/wallet";

import useFetchWallets from "@hooks/useFetchWallets";
import {uiActions} from "@store/reducers/ui-slice";
import {fetchTranslations} from "@services/translations";
import useFetchCurrencies from "@hooks/useFetchCurrencies";

// noinspection JSUnusedGlobalSymbols
export async function getServerSideProps({locale}: { locale: string }) {

    return {
        props: {
            messages: await fetchTranslations(locale)
        }
    };
}

const Home = () => {

    const dispatch = useDispatch()
    const {wallets} = useFetchWallets()
    const {currencies} = useFetchCurrencies()

    useEffect(() => {
        dispatch(uiActions.setNavItems([
            {
                name: 'Dashboard',
                url: `/`,
                active: true
            },
            {
                name: 'Budgets',
                url: `/budgets`,
            },
        ]))

    }, [dispatch]);

    return (
        <>
            <Seo title="Dashboard"/>
            <MotionWrap>
                <WalletContext.Provider value={{currencies}}>
                    <WalletsSection wallets={wallets}/>
                </WalletContext.Provider>
            </MotionWrap>
        </>
    )
}

// @ts-ignore
export default withAuth(Home)

import {useEffect} from "react";
import {useRouter} from 'next/router'
import {motion} from "framer-motion";
import {variants} from "@constants/motion-variants";
import Seo from "@components/Seo";

import {useDispatch} from "react-redux";
import {uiActions} from "@store/reducers/ui-slice";
import {fetchTranslations} from "@services/translations";
import MotionWrap from "@components/UI/Motion";
import {walletOverviewNavigation} from "@constants/navigation";

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps = async ({locale}: {locale: string}) => {

    return {
        props: {
            messages: await fetchTranslations(locale),
            "title": "Edit wallet",
        }
    }
}

const WalletOverview = () => {
    const router = useRouter()
    const {id} = router.query
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(uiActions.setNavItems(walletOverviewNavigation(`${id}`)))
    }, [dispatch, id])

    return (
        <>
            <Seo title="Wallet Overview"/>
            <MotionWrap>
                <h1>Wallet #{id} Overview</h1>
                <p style={{paddingTop: '50px'}}>This page is under construction :)</p>
            </MotionWrap>
        </>
    )
}

export default WalletOverview
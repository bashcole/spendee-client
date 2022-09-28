import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {motion} from "framer-motion";
import {variants} from "@constants/motion-variants";
import Seo from "@components/Seo";

import {uiActions} from "@store/reducers/ui-slice";
import withAuth from "@components/HOC/withAuth";
import {fetchTranslations} from "@services/translations";

export const getServerSideProps = async ({locale} : {locale: string}) => {

    return {
        props: {
            "title": "Edit wallet...",
            messages: await fetchTranslations(locale)
        }
    }
}

const Budgets = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(uiActions.setNavItems([
            {
                name: 'Dashboard',
                url: `/`,
            },
            {
                name: 'Budgets',
                url: `/budgets`,
                active: true
            },
        ]))
    }, [dispatch])

    return (
        <>
            <Seo title="Budgets"/>
            <motion.div
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={variants}
                transition={{duration: 0.4, type: 'easeInOut'}}
                style={{position: 'relative'}}
            >
                <h1>Budgets</h1>
                <p style={{paddingTop: '50px'}}>This page is under construction :)</p>
            </motion.div>
        </>
    )
}

export default withAuth(Budgets)
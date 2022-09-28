import {useEffect, useState} from "react";
import {NextPage} from "next";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";

import {authActions} from "@store/reducers/auth-slice";
import LoadingScreen from "@components/UI/LoadingScreen";
import {uiActions} from "@store/reducers/ui-slice";
import {IRootStore} from "@store/index";
import {stubFalse} from "lodash";

const withAuth = (Component: NextPage) => {
    const AuthenticatedComponent = (props: any) => {
        const router = useRouter();
        const dispatch = useDispatch()
        const loading = useSelector<IRootStore>(state => state.ui.isLoading)

        useEffect(() => {
            const getUser = async () => {
                const userInfo = localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info') || '')
                    : null
                if (!userInfo) {
                    dispatch(authActions.setUser({}))
                    dispatch(authActions.setAuth(false))
                    dispatch(uiActions.hideMenu())
                    dispatch(uiActions.setNavItems([]))
                    dispatch(uiActions.setIsLoading(true))
                    await router.push('/auth/login');
                } else {
                    dispatch(authActions.setAuth(true))
                    dispatch(authActions.setUser(userInfo))
                    dispatch(uiActions.setIsLoading(false))
                }
            };
            getUser().then(r => console.log(r));
        }, [dispatch, router]);

        if (loading) {
            return <LoadingScreen/>
        }

        return <Component {...props} />;
    };

    if (Component.getInitialProps) {
        AuthenticatedComponent.getInitialProps = Component.getInitialProps;
    }

    return AuthenticatedComponent
};

export default withAuth;
import {useEffect} from "react";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";

import {authActions} from "@store/reducers/auth-slice";
import {uiActions} from "@store/reducers/ui-slice";
import LoadingScreen from "@components/UI/LoadingScreen";

const Logout = () => {

    const router = useRouter();
    const dispatch = useDispatch()

    useEffect(() => {
        localStorage.removeItem('user_info')
        dispatch(authActions.setUser({}))
        dispatch(authActions.setAuth(false))
        dispatch(uiActions.hideMenu())
        dispatch(uiActions.setNavItems([]))
        router.push('/auth/login').then(r => '');
    }, [dispatch, router])
    return (
        <LoadingScreen/>
    )
}

export default Logout
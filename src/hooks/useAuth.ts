import {useState} from "react";
import {useRouter} from "next/router";

const useAuth = (
    {
        redirectTo = false,
        redirectIfFound = false
    }) => {

    const router = useRouter();

    // @ts-ignore
    const userInfoFromStorage = localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info'))
        : null

    if (userInfoFromStorage) {
        return [true]
    } else {
        router.push('/auth/login');
    }

}

export default useAuth
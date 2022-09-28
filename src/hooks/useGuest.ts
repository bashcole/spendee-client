import {useState} from "react";
import {useRouter} from "next/router";

const useGuest = (
    {
        redirectTo = false,
        redirectIfFound = false
    }) => {

    const router = useRouter();

    // @ts-ignore
    const userInfoFromStorage = localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info'))
        : null

    if (userInfoFromStorage) {
        router.push('/');
    }

}

export default useGuest
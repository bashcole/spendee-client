import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";

const useOnFailRedirect = (redirectTo, fetcher) => {
    const router = useRouter();
    const [data, setData] = useState()

    useEffect(() => {
        // console.log('vafla..')
        const execute = async () => {
            try {
                const {data} = await fetcher()
                // console.log(data)
                setData(data)

            } catch (e) {
                console.log(e.message)
                // await router.push(redirectTo);
            }
        }
        execute().then()
    }, [fetcher])

    return {
        data
    }
};

export default useOnFailRedirect;
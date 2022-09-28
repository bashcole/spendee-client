import {Provider} from 'react-redux'
import {useRouter} from "next/router";
import type {AppProps} from 'next/app'
import {NextIntlProvider} from 'next-intl';
import {SWRConfig} from "swr";
import {AnimatePresence} from "framer-motion";
import {ThemeProvider} from "styled-components";

import '../styles/globals.css'
import MainLayout from "@components/Layout/Main";
import theme from '@constants/theme/light'
import store from '@store/index';
import 'react-loading-skeleton/dist/skeleton.css'
import {useState} from "react";
import LoadingScreen from "@components/UI/LoadingScreen";

function MyApp({Component, pageProps}: AppProps) {

    const router = useRouter();
    return (
        <NextIntlProvider messages={pageProps.messages}>
            <SWRConfig value={{
                onError: (error, key) => {

                    console.log(`ERROR: ${error}`)

                    // console.log(router.pathname)
                    if (error?.response?.status === 401 && router.pathname !== '/auth/login') {
                        localStorage.removeItem('user_info')
                        router.push('/auth/login').then(r => '');
                    }
                }
            }}>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        {/* @ts-ignore */}
                        <MainLayout>
                            <AnimatePresence exitBeforeEnter initial={true}>
                                <Component {...pageProps}/>
                            </AnimatePresence>
                        </MainLayout>
                    </ThemeProvider>
                </Provider>
            </SWRConfig>
        </NextIntlProvider>
    )
}

export default MyApp

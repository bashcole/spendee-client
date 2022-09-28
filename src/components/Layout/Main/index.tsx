import type {NextPage} from 'next'

import Header from "@components/Layout/Main/components/Header";
import Footer from "@components/Layout/Main/components/Footer";
import {StyledMain, StyledMainContent} from "@components/Layout/Main/style";

const MainLayout: NextPage = (props: any) => {

    return (
        <>
            <Header/>
            <StyledMain>
                <StyledMainContent>
                    {props.children}
                </StyledMainContent>
            </StyledMain>
            <Footer/>
        </>
    )
}

export default MainLayout

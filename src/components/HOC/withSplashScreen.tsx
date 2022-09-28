import {useState} from "react";
import {NextPage} from "next";

import LoadingScreen from "@components/UI/LoadingScreen";

const withSplashScreen = (Component: NextPage) => {
    const Screen = (props: any) => {

        const [loading, setLoading] = useState(true)

        const hideLoading = () => {
            setLoading(false)
        }

        const showLoading = () => {
            setLoading(true)
        }

        return <>
            {loading && <LoadingScreen/>}
            <Component {...props} hideLoading={hideLoading} showLoading={showLoading}/>;
        </>
    };

    if (Component.getInitialProps) {
        Screen.getInitialProps = Component.getInitialProps;
    }

    return Screen;
};

export default withSplashScreen;
import Document, {Html, Head, Main, NextScript} from "next/document";
import {ServerStyleSheet} from "styled-components";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            // eslint-disable-next-line no-param-reassign
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="true"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
                        rel="stylesheet"
                    />
                    {/*<link rel="apple-touch-icon" sizes="57x57" href="/favicons/white/apple-icon-57x57.png"/>*/}
                    {/*<link rel="apple-touch-icon" sizes="60x60" href="/favicons/white/apple-icon-60x60.png"/>*/}
                    {/*<link rel="apple-touch-icon" sizes="72x72" href="/favicons/white/apple-icon-72x72.png"/>*/}
                    {/*<link rel="apple-touch-icon" sizes="76x76" href="/favicons/white/apple-icon-76x76.png"/>*/}
                    {/*<link rel="apple-touch-icon" sizes="114x114" href="/favicons/white/apple-icon-114x114.png"/>*/}
                    {/*<link rel="apple-touch-icon" sizes="120x120" href="/favicons/white/apple-icon-120x120.png"/>*/}
                    {/*<link rel="apple-touch-icon" sizes="144x144" href="/favicons/white/apple-icon-144x144.png"/>*/}
                    {/*<link rel="apple-touch-icon" sizes="152x152" href="/favicons/white/apple-icon-152x152.png"/>*/}
                    {/*<link rel="apple-touch-icon" sizes="180x180" href="/favicons/white/apple-icon-180x180.png"/>*/}
                    {/*<link rel="icon" type="image/png" sizes="192x192" href="/favicons/white/android-icon-192x192.png"/>*/}
                    {/*<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"/>*/}
                    {/*<link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png"/>*/}
                    {/*<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"/>*/}

                </Head>
                <body>
                <Main/>
                <div id='overlay'/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
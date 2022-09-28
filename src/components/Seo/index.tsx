import React from 'react';
import Head from "next/head";

const settings = {
    meta: {
        rootUrl: 'https://spendee.bashcole.com/' || process.env.NEXT_PUBLIC_APP_URL,
        title: "Dashboard",
        description: "See where your money goes",
        social: {
            graphic: "social-graphic.jpg"
        },
    }
};

interface IDefaultProps {
    url?: string;
    title?: string;
    description?: string;
    image?: string;
}

const defaultProps: IDefaultProps = {
    url: settings && settings.meta && settings.meta.rootUrl,
    title: settings && settings.meta && settings.meta.title,
    description: settings && settings.meta && settings.meta.description
}

interface SeoMainProps {
    url?: string,
    title?: string,
    description?: string
}

const Seo = ({url = defaultProps.url, title = defaultProps.title, description = defaultProps.description}: SeoMainProps) => {

    return (
        <Head>
            <title>{title} | Spendee</title>
            <meta name="description" content={description}/>
            <meta itemProp="name" content={title}/>
            <meta itemProp="image" content={`${url}social-graphic.jpg`}/>

            {/*Open Graph / Facebook*/}
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={url}/>
            <meta property="og:title" content={title}/>
            <meta property="og:description"
                  content={description}/>
            <meta property="og:image"
                  content={`${url}social-graphic.jpg`}/>

            {/*Apple touch icon*/}
            <link rel="apple-touch-icon" href={`${url}apple-touch-icon.png`} />
            <link rel="apple-touch-icon" sizes="57x57" href={`${url}apple-touch-icon-57x57.png`} />
            <link rel="apple-touch-icon" sizes="72x72" href={`${url}apple-touch-icon-72x72.png`} />
            <link rel="apple-touch-icon" sizes="76x76" href={`${url}apple-touch-icon-76x76.png`} />
            <link rel="apple-touch-icon" sizes="114x114" href={`${url}apple-touch-icon-114x114.png`} />
            <link rel="apple-touch-icon" sizes="120x120" href={`${url}apple-touch-icon-120x120.png`} />
            <link rel="apple-touch-icon" sizes="144x144" href={`${url}apple-touch-icon-144x144.png`} />
            <link rel="apple-touch-icon" sizes="152x152" href={`${url}apple-touch-icon-152x152.png`} />
            <link rel="apple-touch-icon" sizes="180x180" href={`${url}apple-touch-icon-180x180.png`} />

            {/*Twitter*/}
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={url}/>
            <meta property="twitter:title" content={title}/>
            <meta property="twitter:description"
                  content={description}/>
            <meta property="twitter:image"
                  content={`${url}social-graphic.jpg`}/>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        name: title,
                        about: description,
                        url: url,
                    }),
                }}
            />

        </Head>
    )
}

export default Seo;
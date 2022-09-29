const withPWA = require("next-pwa");
const runtimeCaching = require('next-pwa/cache')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    compiler: {
        // ssr and displayName are configured by default
        styledComponents: true
    },
    i18n: {
        locales: ['en', 'bg'],
        defaultLocale: 'en'
    },
    pwa: {
        dest: "public",
        runtimeCaching
    }
}

module.exports = withPWA(nextConfig)

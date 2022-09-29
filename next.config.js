const withPWA = require("next-pwa");

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
    dest: "public"
  }
}

module.exports = withPWA(nextConfig)

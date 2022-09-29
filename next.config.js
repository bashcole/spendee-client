import withPWA from 'next-pwa'

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
    register: true,
    skipWaiting: true
  }
}

module.exports = withPWA(nextConfig)

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
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    allowMiddlewareResponseBody: true,
  },
}

module.exports = nextConfig

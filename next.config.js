/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['cdn-icons-png.flaticon.com'],
  },
}

module.exports = nextConfig

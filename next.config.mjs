/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
      ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.yandexcloud.net',
        port: '',
      },
    ],
  },
}

export default nextConfig

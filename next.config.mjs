/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
      ignoreDuringBuilds: true,
  },
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: 'https://squad-map.vercel.app/:path*',
      },
    ]
  },
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

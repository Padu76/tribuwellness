/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'], // Per immagini esperienze
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Per immagini da Supabase Storage
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
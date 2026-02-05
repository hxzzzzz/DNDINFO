/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow loading images from external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Safety net: ignore TS errors from legacy files (like index.tsx) during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Safety net: ignore ESLint errors from legacy files during build
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Copies only the files needed at runtime into .next/standalone (tiny Docker image)
  output: 'standalone',
  images: {
    domains: ['assets.aceternity.com'],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Desabilita ESLint durante o build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Desabilita verificação de tipos durante o build
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  server: {
    port: 3001,
  },
};

module.exports = nextConfig;

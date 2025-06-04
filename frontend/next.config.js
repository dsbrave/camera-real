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
  reactStrictMode: false, // Desabilitar para evitar problemas de hidratação
};

module.exports = nextConfig;

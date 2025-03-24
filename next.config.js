const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Force specific runtime for middleware to avoid Edge Runtime issues
  experimental: {
    serverComponentsExternalPackages: ['@clerk/backend'],
  },
  // Disable Edge Runtime in middleware
  transpilePackages: ['@clerk/nextjs'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  }
}

module.exports = withNextIntl(nextConfig); 
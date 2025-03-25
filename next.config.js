/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  images: {
    domains: ['qvasgxzdjmldhbinbrgw.supabase.co'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Add resolve fallback for problematic modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
  transpilePackages: ['react-style-singleton', 'use-sidecar'],
  experimental: {
    optimizeCss: false,
  },
};

module.exports = withNextIntl(nextConfig); 
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

    // Add resolve aliases for problematic modules
    config.resolve.alias = {
      ...config.resolve.alias,
      'use-sidecar': require.resolve('use-sidecar'),
      'react-style-singleton': require.resolve('react-style-singleton'),
    };

    return config;
  },
  transpilePackages: ['use-sidecar', 'react-style-singleton'],
  experimental: {
    optimizeCss: false,
  },
};

module.exports = withNextIntl(nextConfig); 
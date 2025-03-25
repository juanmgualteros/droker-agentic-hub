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
    if (!isServer) {
      // Client-side specific config
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Common config for both client and server
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        'use-sidecar': require.resolve('use-sidecar'),
        'react-style-singleton': require.resolve('react-style-singleton'),
      },
      mainFields: ['browser', 'module', 'main'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    };

    return config;
  },
  // Disable experimental features
  experimental: {
    optimizeCss: false,
  },
  // Ensure proper transpilation
  transpilePackages: [
    'use-sidecar',
    'react-style-singleton',
    '@radix-ui/react-dialog',
    '@radix-ui/react-dropdown-menu',
  ],
  // Disable source maps in production
  productionBrowserSourceMaps: false,
  // Enable strict mode
  reactStrictMode: true,
  // Disable powered by header
  poweredByHeader: false,
};

module.exports = withNextIntl(nextConfig); 
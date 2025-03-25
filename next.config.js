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

    // Ensure proper module resolution
    config.resolve = {
      ...config.resolve,
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      mainFields: ['browser', 'module', 'main'],
    };

    return config;
  },
  // Disable experimental features
  experimental: false,
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
  // Add Node.js compatibility
  serverRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
  },
  // Disable SWC minification for better compatibility
  swcMinify: false,
  compiler: {
    // Enable all transforms
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = withNextIntl(nextConfig); 
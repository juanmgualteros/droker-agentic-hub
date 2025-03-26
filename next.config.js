/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  images: {
    domains: ['qvasgxzdjmldhbinbrgw.supabase.co'],
  },
  env: {
    _next_intl_trailing_slash: "true"
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
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // Configure optimization
    config.optimization = {
      ...config.optimization,
      minimize: true,
      minimizer: [
        ...config.optimization.minimizer || [],
      ],
    };

    return config;
  },
  experimental: {
    serverActions: true,
    optimizeCss: false,
    esmExternals: false,
  },
  transpilePackages: [
    'use-sidecar',
    'react-style-singleton',
    '@radix-ui/react-dialog',
    '@radix-ui/react-dropdown-menu',
  ],
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  serverRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
  },
};

module.exports = withNextIntl(nextConfig);
/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  images: {
    domains: ['qvasgxzdjmldhbinbrgw.supabase.co'],
  },
};

module.exports = withNextIntl(nextConfig); 
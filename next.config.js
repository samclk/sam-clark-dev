/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Vercel restores .next/cache between deploys, and a webpack cache written against a different
  // route graph fails the next prerender. Memory costs nothing here: 6s cold, warm and without it.
  webpack: (config, { dev }) => {
    if (!dev) config.cache = { type: 'memory' };
    return config;
  },
};

module.exports = nextConfig;

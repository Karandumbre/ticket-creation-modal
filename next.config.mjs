/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['randomuser.me'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/config/i18n/request.ts");

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  // Allow Google Fonts to be loaded from external sources
  images: {
    domains: ['fonts.googleapis.com', 'fonts.gstatic.com'],
  },
  // Handle font loading issues in development
  webpack: (config, { dev }) => {
    if (dev) {
      // In development, skip font optimization if network issues occur
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);

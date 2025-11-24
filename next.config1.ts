// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// ✅ Initialize i18n plugin
const withNextIntl = createNextIntlPlugin("./src/config/i18n/request.ts");

// ✅ Define remote image sources
const REMOTE_IMAGE_HOSTS = [
  "images.unsplash.com",
  "cdn.hashnode.com",
  "hashnode.imgix.net",
  "avatars.githubusercontent.com",
  "media.licdn.com",
  "media-exp1.licdn.com",
];

const nextConfig: NextConfig = {
  reactStrictMode: true, // Helps catch bugs early
  swcMinify: true, // Faster, more efficient minification
  productionBrowserSourceMaps: false, // Security improvement
  output: "standalone",

  eslint: {
    ignoreDuringBuilds: true, // Avoid blocking builds in CI/CD
  },

  images: {
    remotePatterns: REMOTE_IMAGE_HOSTS.map((host) => ({
      protocol: "https",
      hostname: host,
      pathname: "/**",
    })),
    formats: ["image/avif", "image/webp"], // ✅ Faster image formats
  },

  experimental: {
    scrollRestoration: true, // UX improvement for back/forward navigation
    serverActions: true, // Future scalability for server-side logic
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false, // ✅ Cleaner production builds
  },

  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "geolocation=()" },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);

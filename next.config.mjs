/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdninstagram.com" },
      { protocol: "https", hostname: "**.cdninstagram.com" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ["bcryptjs", "jose", "@prisma/client"],
  experimental: {
    serverComponentsExternalPackages: ["bcryptjs", "jose", "@prisma/client"],
  },
};

export default nextConfig;
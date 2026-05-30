import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.hemingways-collection.com",
      },
      {
        protocol: "https",
        hostname: "enasoitcollection.com",
      },
    ],
  },
};

export default nextConfig;

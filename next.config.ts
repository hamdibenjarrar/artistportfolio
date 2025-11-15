import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/work/yassine1.jpg",
        destination: "/work/yas1.jpg",
      },
    ];
  },
};

export default nextConfig;

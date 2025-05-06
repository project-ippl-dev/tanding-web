import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true //Temporary, for previous codes
  },
  typescript: {
    ignoreBuildErrors: true //Temporary, for previous codes
  }
};

export default nextConfig;

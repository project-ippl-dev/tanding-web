import type { NextConfig } from "next";

// TODO: Remove pattern beberapa diantaranya dummy perlu disesuaikan saat taha production

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        
        protocol: 'https',
        hostname: 'google.com',
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

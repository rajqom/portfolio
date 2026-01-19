import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Site configuration
  env: {
    SITE_URL: process.env.SITE_URL || 'https://zynra.studio',
  },
  // Enable strict mode for better error handling
  reactStrictMode: true,
  // Optimize production builds
  poweredByHeader: false,
  // Bundle optimization
  compiler: {
    // Remove console logs in production (except errors and warnings)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Optimize bundle size - SWC minification is enabled by default in Next.js 13+
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      '@gsap/react',
      'gsap',
      'framer-motion',
      'lucide-react',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },
};

export default nextConfig;

import type { NextConfig } from 'next';
import { legacyRedirects } from './src/lib/redirects';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // Rewrites `import { Check } from 'lucide-react'` to a direct file import so
    // the icon barrel does not pull siblings into the bundle.
    optimizePackageImports: ['lucide-react'],
  },
  async redirects() {
    return legacyRedirects();
  },
};

export default nextConfig;

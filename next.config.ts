import type { NextConfig } from 'next';
import { legacyRedirects } from './src/lib/redirects';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    /*
     * Next 16 only serves qualities named here — anything else is coerced to the
     * nearest allowed value, so a `quality` prop alone would silently do nothing.
     * 75 is the default and covers the whole site; 82 is for the hero photos,
     * which are large, brightly lit and full of soft wall gradients, the one
     * place where the default starts to band.
     */
    qualities: [75, 82],
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

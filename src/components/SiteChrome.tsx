'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * The site's own header and footer, left out on the blog editor (/keystatic),
 * which is a full-screen app of its own.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/keystatic')) return null;
  return <>{children}</>;
}

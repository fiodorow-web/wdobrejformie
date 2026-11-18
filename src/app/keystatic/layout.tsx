import type { Metadata } from 'next';
import KeystaticApp from './keystatic';

/** The blog editor. Not a public page: kept out of search results. */
export const metadata: Metadata = {
  title: 'Panel bloga',
  robots: { index: false, follow: false },
};

export default function KeystaticLayout() {
  return <KeystaticApp />;
}

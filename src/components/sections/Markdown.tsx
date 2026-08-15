import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import type { ComponentProps } from 'react';
import { Reveal } from '@/components/ds';
import { SIZE_ARTICLE } from '@/lib/image-sizes';
import imageSizes from '../../../content/blog/_images.json';
import styles from './Markdown.module.css';

/** Intrinsic dimensions of every migrated image, written by optimize:images. */
const dimensions = imageSizes as Record<string, { width: number; height: number }>;

/**
 * Component overrides for migrated content.
 *
 * Internal links route through next/link, external ones get rel="noopener".
 * Tables get a scroll container so a wide price table from an old post cannot
 * make the whole page scroll sideways on a phone.
 */
const components = {
  a: ({ href = '', children, ...rest }: ComponentProps<'a'>) => {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    if (isInternal) {
      return (
        <Link href={href} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  },
  table: (props: ComponentProps<'table'>) => (
    <div className={styles.tableWrap}>
      <table {...props} />
    </div>
  ),
  /*
   * Long documents — the regulamin, the intake form, blog posts — are a single
   * markdown block, so a reveal wrapped around the whole thing would sit above
   * the fold and never fire. Revealing each section heading instead gives the
   * page something to do as it scrolls.
   *
   * All three levels are covered because the migrated content is inconsistent:
   * blog posts use h2/h3, while the regulamin came out of WordPress with its
   * section headings as h6.
   *
   * The wrapper is safe against `.markdown > * + *` — the div inherits the
   * heading's place in the spacing rhythm, and `.markdown h2` still matches
   * through it.
   */
  h2: ({ children, ...rest }: ComponentProps<'h2'>) => (
    <Reveal>
      <h2 {...rest}>{children}</h2>
    </Reveal>
  ),
  h3: ({ children, ...rest }: ComponentProps<'h3'>) => (
    <Reveal>
      <h3 {...rest}>{children}</h3>
    </Reveal>
  ),
  h6: ({ children, ...rest }: ComponentProps<'h6'>) => (
    <Reveal>
      <h6 {...rest}>{children}</h6>
    </Reveal>
  ),
  /*
   * Markdown image syntax produces a bare <img>: no resizing, no format
   * negotiation, no intrinsic size, so it shifts the layout as it loads. Route
   * every one through next/image instead, using the dimensions manifest so the
   * browser can reserve the right box before the bytes arrive.
   */
  img: ({ src, alt }: ComponentProps<'img'>) => {
    if (typeof src !== 'string') return null;

    const size = dimensions[src];
    if (!size) {
      // An image we have no dimensions for (e.g. still hosted remotely).
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt ?? ''} loading="lazy" decoding="async" />;
    }

    // Most migrated images are small WordPress thumbnails (300px wide). Passing
    // `sizes` there makes next/image emit the full device-width srcset — eight
    // variants for an image that can never render larger than its source. Only
    // images big enough to actually scale get the responsive treatment; the
    // rest fall back to a plain 1x/2x srcset.
    const isLarge = size.width >= 700;

    return (
      <Image
        src={src}
        alt={alt ?? ''}
        width={size.width}
        height={size.height}
        sizes={isLarge ? SIZE_ARTICLE : undefined}
        className={styles.image}
      />
    );
  },
};

export function Markdown({ source }: { source: string }) {
  return (
    <div className={styles.markdown}>
      <MDXRemote
        source={source}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}

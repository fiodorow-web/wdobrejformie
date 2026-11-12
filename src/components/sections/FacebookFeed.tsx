'use client';

import { useRef, useState } from 'react';
import { FacebookIcon } from '@/components/ds';
import styles from './FacebookFeed.module.css';

/**
 * The poradnia's Facebook posts, via Facebook's Page Plugin.
 *
 * The plugin is an iframe from facebook.com, and loading it lets Facebook set
 * cookies and see the visit. So it is not loaded with the page: the visitor
 * clicks first (a "two-click" embed), which keeps the site free of a consent
 * banner and of Facebook tracking for everyone who never opens it.
 */

/** Facebook's plugin accepts 180–500 px and does not resize itself afterwards. */
const MIN_WIDTH = 180;
const MAX_WIDTH = 500;
const HEIGHT = 600;

export function FacebookFeed({ pageUrl }: { pageUrl: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  const load = () => {
    const available = boxRef.current?.clientWidth ?? MAX_WIDTH;
    setWidth(Math.round(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, available))));
  };

  const src =
    width &&
    `https://www.facebook.com/plugins/page.php?${new URLSearchParams({
      href: pageUrl,
      tabs: 'timeline',
      width: String(width),
      height: String(HEIGHT),
      small_header: 'true',
      adapt_container_width: 'true',
      hide_cover: 'false',
      show_facepile: 'false',
    })}`;

  return (
    <div ref={boxRef} className={styles.box}>
      {src ? (
        <iframe
          src={src}
          width={width ?? MAX_WIDTH}
          height={HEIGHT}
          className={styles.frame}
          title="Najnowsze posty poradni W Dobrej Formie na Facebooku"
          allow="encrypted-media; clipboard-write"
        />
      ) : (
        <div className={styles.placeholder}>
          <FacebookIcon size={32} className={styles.icon} />
          <p className={styles.lead}>Tu możesz zobaczyć nasze najnowsze posty z Facebooka.</p>
          <button type="button" className={styles.button} onClick={load}>
            Pokaż posty z Facebooka
          </button>
          <p className={styles.note}>
            Posty wczytują się z serwisu Facebook dopiero po kliknięciu. Facebook może wtedy
            zapisać pliki cookies.
          </p>
        </div>
      )}
    </div>
  );
}

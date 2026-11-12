import { Star } from 'lucide-react';
import { Button, Card } from '@/components/ds';
import { site } from '@/content/site';
import styles from './GoogleReview.module.css';

/**
 * "Oceń nas w Google" — the web version of the stand in the gabinet. It opens
 * the same review form as the stand's QR code and NFC tag. On a phone the
 * button is the way in; on a computer the QR code lets the visitor finish on
 * the phone, where they are usually signed in to Google.
 */
export function GoogleReview() {
  return (
    <Card variant="elevated" className={styles.card}>
      <div className={styles.text}>
        <div className={styles.stars} aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} size={22} strokeWidth={1.5} />
          ))}
        </div>
        <h3 className={styles.title}>Oceń nas w Google</h3>
        <p className={styles.lead}>
          Zostaw nam swoją opinię i odbierz <strong>rabat 20%</strong>.
        </p>
        <p className={styles.note}>
          Do dodania opinii potrzebne jest konto Google. W gabinecie wystarczy zbliżyć telefon do
          tabliczki „Oceń nas w Google” albo zeskanować z niej kod.
        </p>
        <div className={styles.actions}>
          <Button href={site.googleReviewUrl}>
            Napisz opinię w Google
            <span className="visually-hidden"> (otwiera się w nowej karcie)</span>
          </Button>
        </div>
      </div>
      <figure className={styles.qr}>
        {/* A static SVG of a few hundred bytes — nothing for the image optimiser to do. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/qr/opinia-google.svg"
          width={160}
          height={160}
          alt="Kod QR prowadzący do formularza opinii o poradni W Dobrej Formie w Google"
        />
        <figcaption>Na komputerze? Zeskanuj kod aparatem w telefonie.</figcaption>
      </figure>
    </Card>
  );
}

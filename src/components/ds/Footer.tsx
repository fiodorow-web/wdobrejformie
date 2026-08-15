import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/content/site';
import { footerNav, legalNav } from '@/content/navigation';
import styles from './Footer.module.css';

/**
 * The exported Footer hardcoded the address, phone, email, nav labels and a
 * literal "© 2026". All of it now comes from content modules, and the year is
 * computed — this component renders on the server, so it is always current.
 */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div>
            <Image
              src="/logo/logo-full-transparent.png"
              alt="W Dobrej Formie"
              width={420}
              height={212}
              className={styles.logoImage}
            />
            <address className={styles.contact}>
              <span>{site.legalName}</span>
              <span>
                {site.address.city}, {site.address.street}
              </span>
              <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <span className={styles.hours}>{site.openingHours.label}</span>
            </address>
          </div>

          {footerNav.map((group) => (
            <div key={group.heading}>
              <h2 className={styles.heading}>{group.heading}</h2>
              <ul className={styles.list}>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <span>
            © {new Date().getFullYear()} {site.name} · NIP {site.nip}
          </span>
          <ul className={styles.legal}>
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
            <li>
              <a href={site.patientZoneUrl} target="_blank" rel="noopener noreferrer">
                Strefa Pacjenta
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

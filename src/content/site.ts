/**
 * Single source of truth for the practice's identity and contact data.
 *
 * Everything here is transcribed from the current site (kontakt.pdf / the live
 * footer), NOT invented. The prototype's Footer.jsx hardcoded most of this — it
 * lives here instead so the JSON-LD, the footer and the contact page can never
 * drift apart.
 */

export const site = {
  name: 'W Dobrej Formie',
  legalName: 'W Dobrej Formie — poradnia dietetyczna',
  shortDescription:
    'Poradnia dietetyczna w Węgrowie. Konsultacje, indywidualne plany żywieniowe, analiza składu ciała i strefa zabiegowa modelowania sylwetki.',
  url: 'https://wdobrejformie.net',
  locale: 'pl_PL',
  lang: 'pl',

  /** Where patients actually come — the consulting room. */
  address: {
    street: 'ul. Staszica 4, I piętro',
    city: 'Węgrów',
    /** TODO(klientka): potwierdzić kod pocztowy — nie występuje w żadnym źródle. */
    postalCode: '07-100',
    country: 'PL',
    countryName: 'Polska',
  },

  /**
   * Registered office of the business, which differs from the consulting room.
   * Taken from the regulamin on the current site — needed on legal pages and in
   * the JSON-LD, and easy to get wrong if you only read the contact page.
   */
  legalEntity: {
    name: 'Poradnia dietetyczna W DOBREJ FORMIE Magdalena Skolimowska',
    street: 'ul. Kupientyńska 74A',
    city: 'Sokołów Podlaski',
  },

  phone: '+48 516 462 624',
  /** E.164, for tel: links and structured data. */
  phoneHref: '+48516462624',
  email: 'wdobrejformie@gmail.com',

  nip: '823 162 39 98',
  regon: '146780045',
  bankAccount: '92 1950 0001 2006 0043 7723 0001',

  openingHours: {
    label: 'Poniedziałek – piątek, 8:00–18:00',
    /** schema.org openingHoursSpecification source */
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const,
    opens: '08:00',
    closes: '18:00',
  },

  /**
   * The patient panel is a third-party SaaS (DietetykPro), not part of this site
   * and not part of the old WordPress either. It stays an outbound link.
   */
  patientZoneUrl: 'https://pacjent.dietetykpro.pl/zaloguj',

  /** Response promise made on the current /kontakt/ page for online enquiries. */
  onlineReplyPromise: 'W ciągu 24 godzin otrzymasz od nas wiadomość zwrotną.',
} as const;

export type Site = typeof site;

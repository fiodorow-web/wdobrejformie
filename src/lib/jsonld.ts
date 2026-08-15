import { site } from '@/content/site';
import { treatments } from '@/content/treatments';
import { priceGroups } from '@/content/pricing';
import type { FaqEntry } from '@/content/faq';
import type { PostMeta } from '@/lib/blog';

const ORG_ID = `${site.url}/#organizacja`;

/**
 * The practice itself.
 *
 * Typed as both MedicalBusiness and HealthAndBeautyBusiness because it genuinely
 * is both — dietetics consultations on one side, body-contouring treatments on
 * the other. `address` is the consulting room in Węgrów, which is where patients
 * actually go; the registered office in Sokołów Podlaski appears only on the
 * legal pages.
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'HealthAndBeautyBusiness'],
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalEntity.name,
    description: site.shortDescription,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    priceRange: '50–3000 PLN',
    currenciesAccepted: 'PLN',
    paymentAccepted: 'Gotówka, przelew, BLIK',
    taxID: site.nip.replace(/\s/g, ''),
    logo: `${site.url}/logo/logo-full-transparent.png`,
    image: `${site.url}/logo/logo-mark-square.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: [
      { '@type': 'City', name: 'Węgrów' },
      { '@type': 'City', name: 'Sokołów Podlaski' },
      { '@type': 'City', name: 'Łochów' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: site.openingHours.days.map((day) => `https://schema.org/${day}`),
        opens: site.openingHours.opens,
        closes: site.openingHours.closes,
      },
    ],
    availableService: treatments.map((treatment) => ({
      '@type': 'Service',
      name: treatment.name,
      url: `${site.url}/modelowanie-sylwetki/${treatment.slug}`,
    })),
  };
}

/** Both specialists, linked back to the practice. */
export function personJsonLd(options: {
  name: string;
  role: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: options.name,
    jobTitle: options.role,
    description: options.description,
    url: options.url,
    worksFor: { '@id': ORG_ID },
  };
}

/** One Offer per priced item, so the price list can surface in results. */
export function priceListJsonLd() {
  const offers = priceGroups.flatMap((group) =>
    group.items
      .filter((item) => typeof item.price === 'number')
      .map((item) => ({
        '@type': 'Offer',
        name: item.name,
        description: item.description,
        price: String(item.price),
        priceCurrency: 'PLN',
        availability: 'https://schema.org/InStock',
        seller: { '@id': ORG_ID },
      })),
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Cennik — W Dobrej Formie',
    url: `${site.url}/cennik`,
    itemListElement: offers,
  };
}

export function serviceJsonLd(options: {
  name: string;
  description: string;
  url: string;
  price: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: options.name,
    description: options.description,
    url: options.url,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'City', name: site.address.city },
    offers: {
      '@type': 'Offer',
      price: String(options.price),
      priceCurrency: 'PLN',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function faqJsonLd(entries: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.q,
      acceptedAnswer: { '@type': 'Answer', text: entry.a },
    })),
  };
}

export function articleJsonLd(post: PostMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated,
    url: `${site.url}/blog/${post.slug}`,
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    inLanguage: 'pl-PL',
  };
}

export function breadcrumbJsonLd(trail: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}

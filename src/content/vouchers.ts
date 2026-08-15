/**
 * Gift vouchers — the only thing the old WooCommerce shop ever sold.
 *
 * Two products, both 270 zł. Note that on the current site both carry the same
 * description (the treatment voucher repeats the dietetics copy verbatim), which
 * is a content bug there; the treatment voucher's text below is written to match
 * what it actually is. Confirm with the client before publishing.
 *
 * Ordering currently runs through the contact form and a bank transfer, exactly
 * as the old shop did — the shop itself is pending decision 1 in the plan.
 */

export interface Voucher {
  slug: string;
  name: string;
  price: number;
  summary: string;
  includes: Array<{ title: string; description: string }>;
  line: 'dietetyka' | 'zabiegi';
}

export const vouchers: Voucher[] = [
  {
    slug: 'kupon-podarunkowy-dietetyczny',
    name: 'Kupon podarunkowy dietetyczny',
    price: 270,
    summary: 'Konsultacja dietetyczna z badaniem składu ciała oraz indywidualny 7-dniowy jadłospis.',
    line: 'dietetyka',
    includes: [
      {
        title: 'Pierwsza konsultacja dietetyczna (60 minut)',
        description:
          'Badanie składu ciała na profesjonalnym analizatorze wraz z omówieniem wyników. Analizujemy dotychczasowy sposób odżywiania, szukamy sposobów na poprawę nawyków i ustalamy cele współpracy.',
      },
      {
        title: 'Indywidualny 7-dniowy jadłospis',
        description:
          'Uwzględnia dotychczasowe nawyki i preferencje smakowe. Z listą zakupów i rozpiską do zawieszenia na lodówkę — dieta dopasowana do możliwości, nie odwrotnie.',
      },
    ],
  },
  {
    slug: 'kupon-podarunkowy-na-zabiegi',
    name: 'Kupon podarunkowy na zabiegi',
    price: 270,
    summary: 'Do wykorzystania na zabiegi modelowania sylwetki w strefie zabiegowej.',
    line: 'zabiegi',
    includes: [
      {
        title: 'Zabiegi do wyboru',
        description:
          'Kupon obejmuje zabiegi ze strefy zabiegowej — lipolaser, liposukcję kawitacyjną, fale radiowe RF, kriolipolizę, endomasaż SLIMROLL X, masaż Kobido lub oczyszczanie wodorowe.',
      },
      {
        title: 'Dobór zabiegu na miejscu',
        description:
          'Podczas pierwszej wizyty wspólnie ustalamy, który zabieg i ile sesji będzie miało sens w konkretnym przypadku.',
      },
    ],
  },
];

/** Terms shared by both vouchers, transcribed from the shop. */
export const voucherTerms = [
  'Kupon otrzymasz on-line drogą mailową w ciągu 24 godzin od zakupu (zwykle szybciej) albo odbierzesz osobiście wersję papierową w ekskluzywnej kopercie.',
  'Kupon należy zrealizować w ciągu 3 miesięcy od daty zakupu — w tym czasie trzeba umówić się telefonicznie lub e-mailowo na pierwszą konsultację.',
] as const;

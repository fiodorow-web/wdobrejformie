/**
 * Massages in the strefa zabiegowa, shown on /modelowanie-sylwetki/masaze and
 * in the price list (/cennik → Modelowanie sylwetki → Fizjoterapia i masaże).
 *
 * Copied word for word from the poradnia's current price page, as the client
 * sent it (2026-11). Two quirks are hers and kept: the two slimming massages
 * share one description, and the relaxing massage is named "plecy, kark,
 * barki" while its description says "całego ciała".
 *
 * Masaż Kobido and Endomasaż SLIMROLL X are treatments with their own pages
 * (src/content/treatments.ts), so they are not listed here.
 */

export interface Massage {
  name: string;
  minutes: number;
  price: number;
  description: string;
}

export interface MassageGroup {
  title: string;
  /** Shared description, where the source gives one for the whole group. */
  description?: string;
  items: Massage[];
}

const slimming =
  'Intensywny masaż całego ciała ukierunkowany na pobudzenie krążenia, poprawę napięcia skóry oraz wsparcie modelowania sylwetki. Pomaga wygładzić skórę, zmniejszyć widoczność cellulitu i wspierać naturalne procesy metaboliczne organizmu. Doskonałe uzupełnienie terapii modelujących i zabiegów na ciało.';

const classic =
  'Masaż klasyczny całego ciała to intensywniejsza forma masażu, skoncentrowana na rozluźnieniu napiętych i przeciążonych mięśni. Wykonywane techniki pomagają poprawić elastyczność tkanek, wspierają krążenie i przywracają mięśniom większą swobodę ruchu.';

export const massageGroups: MassageGroup[] = [
  {
    title: 'Masaże wyszczuplające i ujędrniające',
    items: [
      { name: 'Masaż wyszczuplający całego ciała', minutes: 60, price: 160, description: slimming },
      {
        name: 'Masaż wyszczuplająco-ujędrniający całego ciała',
        minutes: 60,
        price: 180,
        description: slimming,
      },
      {
        name: 'Masaż wyszczuplający z boosterem ujędrniającym',
        minutes: 40,
        price: 160,
        description:
          'Intensywny masaż całego ciała wykonywany z wykorzystaniem boostera ujędrniającego zamiast tradycyjnego olejku. Połączenie technik masażu z działaniem aktywnych składników boostera wspiera poprawę jędrności, napięcia i wygładzenia skóry.',
      },
    ],
  },
  {
    title: 'Masaż klasyczny',
    description: classic,
    items: [
      { name: 'Masaż klasyczny całego ciała', minutes: 60, price: 160, description: classic },
      { name: 'Masaż klasyczny — plecy, kark, barki', minutes: 30, price: 100, description: classic },
    ],
  },
  {
    title: 'Masaż relaksacyjny',
    items: [
      {
        name: 'Masaż relaksacyjny — plecy, kark, barki',
        minutes: 30,
        price: 100,
        description:
          'Delikatny masaż całego ciała z wykorzystaniem aromatycznego olejku eterycznego, stworzony z myślą o głębokim odprężeniu i wyciszeniu. Płynne, spokojne ruchy pomagają uwolnić ciało od codziennego napięcia i wprowadzić w stan przyjemnego relaksu. To idealny zabieg dla osób, które chcą zatrzymać się na chwilę, zadbać o swoje ciało i odzyskać wewnętrzny spokój.',
      },
    ],
  },
];

export const massages: Massage[] = massageGroups.flatMap((group) => group.items);

/** Lowest single-massage price — there are no series for massages. */
export const massagesFrom = Math.min(...massages.map((massage) => massage.price));

/** Shortest and longest session, for the "Czas" line on the tile. */
export const massageDurationLabel = `${Math.min(...massages.map((m) => m.minutes))}–${Math.max(...massages.map((m) => m.minutes))} minut`;

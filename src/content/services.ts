/**
 * Service content for the dietetics line.
 *
 * Prose is rewritten from the source pages per the brand's "never copy 1:1"
 * rule; procedural lists (what the scan measures, how to prepare) are carried
 * over verbatim, because those are instructions, not marketing.
 */

/** The four cards on /oferta. */
export interface ServiceSummary {
  title: string;
  href: string;
  description: string;
  priceFrom: string;
  line: 'dietetyka' | 'zabiegi';
  /** lucide-react icon name, resolved by the rendering component. */
  icon: 'stethoscope' | 'clipboard-list' | 'scan-line' | 'sparkles';
}

export const serviceSummaries: ServiceSummary[] = [
  {
    title: 'Konsultacje dietetyczne',
    href: '/konsultacje',
    description:
      'Wywiad żywieniowo-zdrowotny, badanie składu ciała i wspólne ustalenie celu. Także przy schorzeniach i dietach eliminacyjnych.',
    priceFrom: 'od 120 zł',
    line: 'dietetyka',
    icon: 'stethoscope',
  },
  {
    title: 'Plany żywieniowe',
    href: '/plany-zywieniowe',
    description:
      '7-dniowy jadłospis z gramaturą, przepisami i listą zakupów na cały tydzień. Bez suplementów, z produktów dostępnych w każdym sklepie.',
    priceFrom: 'od 160 zł',
    line: 'dietetyka',
    icon: 'clipboard-list',
  },
  {
    title: 'Analiza składu ciała',
    href: '/analiza-skladu-ciala',
    description:
      'Badanie BIA na analizatorze Jawon Medical. Ponad 30 parametrów Twojego organizmu w kilkanaście minut.',
    priceFrom: '50 zł',
    line: 'dietetyka',
    icon: 'scan-line',
  },
  {
    title: 'Modelowanie sylwetki',
    href: '/modelowanie-sylwetki',
    description:
      'Strefa zabiegowa: lipolaser, liposukcja kawitacyjna, fale radiowe RF, kriolipoliza, SLIMROLL X oraz zabiegi na twarz.',
    priceFrom: 'od 140 zł',
    line: 'zabiegi',
    icon: 'sparkles',
  },
];

/** The 30+ parameters the BIA scan reports, quoted from /analiza-skladu-ciala/. */
export const biaParameters = [
  'masa białka oraz masa minerałów',
  'zawartość wody całkowitej w organizmie',
  'masa tkanki tłuszczowej w kilogramach',
  'masa mięśni szkieletowych i organów wewnętrznych',
  'beztłuszczowa masa ciała',
  'waga, waga wzorcowa oraz BMI',
  'procentowa zawartość tkanki tłuszczowej',
  'podstawowa przemiana materii (BMR)',
  'całkowite zużycie energii (TEE)',
  'rodzaj budowy ciała — 9 różnych rodzajów',
  'segmentowa analiza tkanki tłuszczowej i beztłuszczowej masy ciała (prawe i lewe ramię, prawa i lewa noga, tułów)',
  'zmiana budowy ciała',
  'przewodnik kontroli — ilość tkanki tłuszczowej i mięśniowej do kontrolowania, cel oraz czas potrzebny na zmiany',
  'kaloryczność zalecanej diety oraz tygodniowe cele i ilość kalorii do spalenia',
  'poziom tłuszczu trzewnego',
  'powierzchnia tłuszczu trzewnego',
  'obwód talii',
  'wskaźnik talia–biodro (WHR)',
  'impedancja',
  'wiek metaboliczny',
] as const;

/** Preparation rules for the scan, quoted from /przygotowanie-do-wizyty/. */
export const visitPreparation = [
  'Badanie wykonaj 2–3 godziny po posiłku — po jedzeniu wzrasta zawartość wody w organizmie.',
  'Na 4 godziny przed pomiarem nie pij napojów moczopędnych ani zawierających kofeinę (kawa, mocna herbata).',
  'Wypij 2 szklanki wody na 2 godziny przed badaniem.',
  'Badanie wykonaj 3–4 godziny po kąpieli, saunie lub aktywności fizycznej — te czynności sprzyjają wydzielaniu potu.',
  'Nie pij alkoholu przez 24 godziny przed pomiarem.',
  'Załóż możliwie lekki ubiór i zadbaj o czystość dłoni i stóp — na nich dokonywany jest pomiar.',
] as const;

/** How the meal plans work, from /plany-zywieniowe/. */
export const mealPlanAdvantages = [
  'Plany żywieniowe układamy indywidualnie dla każdego Pacjenta.',
  'W jadłospisach nie stosujemy żadnych suplementów diety.',
  'Plany zawierają wyłącznie produkty łatwo dostępne w sklepach.',
  'Nie musisz ważyć produktów — podajemy zarówno miary domowe, jak i ilość w gramach.',
  'Plan jest rozpisany na każdy dzień osobno — na jednej kartce masz wszystkie posiłki i produkty na dany dzień.',
  'Sam decydujesz o kolejności dni diety, dopasowując plan do swoich możliwości czasowych.',
] as const;

export const mealPlanChoices = [
  'ile posiłków dziennie jesz i o których godzinach',
  'które posiłki jesz w domu, a które zabierasz na wynos',
  'jak urozmaicona ma być dieta i jak często robisz zakupy',
  'jak często możesz przygotować obiad lub inne ciepłe danie',
] as const;

/** The four steps of a collaboration, used on the home page and /konsultacje. */
export const processSteps = [
  {
    title: 'Konsultacja wstępna',
    description:
      'Badanie składu ciała i wywiad żywieniowo-zdrowotny. Ustalamy cel i sposób dojścia do niego. 45–60 minut.',
  },
  {
    title: 'Indywidualny jadłospis',
    description:
      '7-dniowy plan z gramaturą, przepisami i listą zakupów, ułożony pod Twoje preferencje i tryb dnia.',
  },
  {
    title: 'Konsultacje kontrolne',
    description:
      'Co 2–3 tygodnie sprawdzamy postępy na analizatorze i modyfikujemy jadłospis. Między wizytami piszesz do nas bez limitu.',
  },
  {
    title: 'Stabilizacja wagi',
    description:
      'Plan na 3–4 tygodnie po zakończonym odchudzaniu oraz Zalecenia Zdrowego Żywienia, żeby efekt został na dłużej.',
  },
] as const;

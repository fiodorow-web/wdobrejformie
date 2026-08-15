/**
 * The two specialists.
 *
 * The design-system prototype only ever showed Magdalena; Katarzyna, who runs
 * the entire treatment line, was missing from it. Both are here.
 *
 * Credentials, dates and certificate names are transcribed exactly from
 * /poznajmy-sie/ — they are professional qualifications, not marketing copy.
 */

import type { StaticImageData } from 'next/image';

import magdalenaPhoto from '@/assets/photos/magdalena-skolimowska-portret.webp';
import katarzynaPhoto from '@/assets/photos/katarzyna-tyszko-fizjoterapeutka.webp';

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  /** Which service line this person leads — drives the accent colour. */
  line: 'dietetyka' | 'zabiegi';
  /** Opening hook, written in first person. */
  intro: string[];
  /** Longer biography paragraphs. */
  bio: string[];
  education?: string[];
  experience?: string[];
  achievements?: string[];
  /** Closing statement in the specialist's own voice. */
  credo?: string[];
  /** Short credential chips shown next to the portrait. */
  badges: string[];
  photo?: StaticImageData;
  /**
   * Alt text for the portrait. Written per person rather than generated from
   * the name so it can carry the role and the town — this is the page search
   * engines rank for "dietetyk Węgrów".
   */
  photoAlt?: string;
}

export const team: TeamMember[] = [
  {
    slug: 'magdalena-skolimowska',
    name: 'mgr inż. Magdalena Skolimowska',
    role: 'Specjalistka ds. żywienia, dietetyk, specjalista SOIT',
    line: 'dietetyka',
    intro: [
      'Obawiasz się wizyty u dietetyka, bo boisz się, że Cię wyśmieje i wręczy listę zakazów?',
      'W moim gabinecie możesz odetchnąć, bo nic takiego Cię nie spotka. Skąd wiem? Połączenie ponad 10-letniego doświadczenia w pracy zawodowej, pasji do zdrowego stylu życia i wykształcenia wyższego to gwarancja Twojego sukcesu. Dietę i wskazówki dopasujemy do Ciebie, a nie na odwrót!',
    ],
    bio: [
      'Dietetyką i poradnictwem żywieniowym zajmuję się od 2010 roku. Poradnię dietetyczną W Dobrej Formie prowadzę z wieloma sukcesami od ponad 10 lat. Przyjmuję Pacjentów stacjonarnie w gabinecie w Węgrowie oraz on-line.',
    ],
    education: [
      'SGGW w Warszawie — studia inżynierskie i magisterskie na kierunku Technologia Żywności i Żywienie Człowieka, specjalizacja Żywienie Człowieka i Nauki Konsumenckie.',
    ],
    experience: [
      'Staż w wydawnictwie Presspublica w Warszawie, redakcja gazety „Rzeczpospolita”.',
      'Dietetyk w sieci Fitness Klubów Zdrofit w Warszawie — prowadzenie klientów indywidualnych uprawiających rekreacyjną aktywność fizyczną.',
      'Specjalistka ds. żywienia w firmie Musli Tak Jak Chcesz w Warszawie.',
      'Wsparcie działań Fundacji Run And Fun w Warszawie — aktywne i zdrowe spędzanie czasu przez dzieci, młodzież i seniorów.',
    ],
    achievements: [
      '„Wartość odżywcza w surowcu i na talerzu — praktyczne wskazówki kulinarne” — wykład w warszawskiej kawiarni Ethno Cafe.',
      '„Dieta dżentelmena na wiosnę” — artykuł dla magazynu „Gentleman”.',
      'Zajęcia edukacyjne w ramach projektu „Od bierności do aktywności — program aktywizacji społecznej osób w wieku 50+”.',
      'Dokumentowanie i wdrażanie systemu HACCP — udział w certyfikowanym szkoleniu.',
      'Kurs dietetyki i odchudzania I i II stopnia — tytuł specjalisty ds. dietetyki z zaświadczeniem MEN.',
      '„Żywienie w sporcie i rekreacyjnej aktywności fizycznej” — udział w konferencji.',
      'Zajęcia edukacyjne w ramach projektu „Ćwicz po zdrowie na Ursynowie”, Warszawa 2014–2019.',
      'Szkolenie „Praktyczna dietoterapia cukrzycy typu I i II”, Wrocław.',
      'Warsztaty żywieniowe wraz z pomiarami składu ciała dla Kół Gospodyń Wiejskich w Sterdyni, Starej Wsi i Liwie, 2019.',
      'Szkolenie „Dieta w chorobie Hashimoto. Co pomaga w świetle badań?” — certyfikat, 2021.',
      'Zajęcia edukacyjne dla dzieci i młodzieży ze szkoły tańca „Latino Fiver” w Łochowie, 2021.',
      'Szkolenie „Czym jest SIBO i SIFO? Objawy, przyczyny i dietoterapia” — certyfikat, 2022.',
      'Szkolenie „Dieta low FODMAP i probiotykoterapia w zespole jelita nadwrażliwego” — certyfikat, 2022.',
      'Szkolenie „School of insulinresistance therapy — SOIT” — certyfikat „Specjalista przyjazny insulinoopornym” oraz wpis na listę specjalistów Fundacji Insulinooporność, 2022.',
      'IV Kongres Pediatryczno-Żywieniowy — tytuł Specjalisty Przyjaznego Dzieciom, 2022.',
    ],
    credo: [
      'W planowaniu jadłospisów kieruję się dobrem moich Pacjentów. Szczególną uwagę zwracam na dopasowanie diety do indywidualnych potrzeb każdej osoby: preferencji smakowych, pracochłonności przygotowywania posiłków, umiejętności kulinarnych i konieczności zabierania posiłków do pracy czy szkoły.',
      'Jadłospisy przygotowuję w oparciu o zasady zdrowego żywienia — ich podstawą są produkty, które aktualnie spożywasz i te, które znajdziesz w każdym sklepie.',
      'W trakcie współpracy staram się przekazać Pacjentowi wiedzę z zakresu żywienia oraz wspólnie wypracować jej zastosowanie w praktyce. Wykształcenie prawidłowych nawyków żywieniowych jest gwarancją utrzymania osiągniętych efektów.',
    ],
    badges: ['SGGW w Warszawie', 'Specjalista SOIT', 'Praktyka od 2010 roku'],
    photo: magdalenaPhoto,
    photoAlt:
      'Mgr inż. Magdalena Skolimowska, dietetyk i właścicielka poradni dietetycznej W Dobrej Formie w Węgrowie',
  },
  {
    slug: 'katarzyna-tyszko',
    name: 'mgr Katarzyna Tyszko',
    role: 'Specjalistka ds. modelowania sylwetki',
    line: 'zabiegi',
    intro: [
      'Jestem magistrem fizjoterapii, co daje mi wiedzę anatomiczną, którą na co dzień łączę z zaawansowanymi technologiami.',
      'Specjalizuję się w zabiegach maszynowego wyszczuplania ciała z wykorzystaniem nowoczesnych urządzeń redukujących tkankę tłuszczową, cellulit, rozstępy i wiotką skórę.',
    ],
    bio: [
      'Do każdej osoby podchodzę indywidualnie — dbając nie tylko o efekt wizualny, ale przede wszystkim o bezpieczeństwo, komfort na wizycie i zdrowie pacjenta.',
      'Staram się łączyć nowoczesne technologie modelowania sylwetki z holistycznym podejściem do pielęgnacji całego ciała. Oprócz specjalistycznych zabiegów wyszczuplających i ujędrniających wykonuję również zabiegi na twarz — liftingujące, ujędrniające i oczyszczające.',
    ],
    credo: [
      'Wierzę, że kompleksowa pielęgnacja ciała i twarzy pozwala osiągnąć najlepsze, naturalnie harmonijne efekty.',
    ],
    badges: ['Magister fizjoterapii', 'Strefa zabiegowa'],
    photo: katarzynaPhoto,
    photoAlt:
      'Mgr Katarzyna Tyszko, magister fizjoterapii, prowadzi strefę modelowania sylwetki w Węgrowie',
  },
];

export function getTeamMember(slug: string): TeamMember | undefined {
  return team.find((member) => member.slug === slug);
}

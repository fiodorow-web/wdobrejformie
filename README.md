# W Dobrej Formie — strona poradni dietetycznej

Nowa strona poradni dietetycznej **W Dobrej Formie** z Węgrowa, zastępująca
dotychczasową witrynę na WordPressie (Hestia + Elementor).

Warstwa wizualna pochodzi z design systemu przygotowanego w Claude Design
(`w-dobrej-formie-design-system/` — katalog tylko do odczytu, źródło tokenów,
komponentów i reguł redakcyjnych). Architektura informacji została zaprojektowana
od nowa; twardym wymogiem było, żeby żadna treść ze starej witryny nie zginęła.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript strict |
| Stylowanie | CSS Modules + tokeny jako CSS custom properties |
| Ikony | lucide-react |
| Font | Manrope, self-hosted przez `next/font` |
| Treść | typowane moduły TS w `src/content/`, blog i strony prawne w MDX |
| Formularz | Server Action + Zod + Resend + Cloudflare Turnstile |
| Testy | Playwright (Chrome + mobilny WebKit) + axe-core |
| Hosting | Vercel |

## Start

```bash
npm install
cp .env.example .env.local   # opcjonalnie — bez tego formularz nie wyśle maila
npm run dev
```

## Skrypty

| Komenda | Opis |
|---|---|
| `npm run dev` | serwer deweloperski |
| `npm run build` | build produkcyjny (56 stron statycznych) |
| `npm start` | serwer produkcyjny |
| `npm run lint` | ESLint + reguły zgodności z design systemem |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test:e2e` | Playwright: smoke, a11y, klawiatura, formularz |
| `npm run migrate:blog` | ponowny import 28 wpisów i stron prawnych ze starego WP |
| `npm run verify:coverage` | audyt kompletności treści względem starej witryny |
| `npm run verify:redirects` | sprawdza, że każdy stary URL rozwiązuje się w jednym skoku |

Skrypty weryfikacyjne wymagają uruchomionego serwera (`npm run build && npm start`)
i odpytują żywe API starej witryny.

## Struktura

```
src/
├── app/                 trasy (App Router), sitemap, robots, Server Action formularza
├── components/ds/       biblioteka design systemu (20 komponentów, .tsx + .module.css)
├── components/sections/ sekcje składane ze stron
├── content/             typowane treści: cennik, zabiegi, zespół, metamorfozy, FAQ
├── lib/                 JSON-LD, walidacja, przekierowania, blog
└── styles/              tokens.css, base.css
content/blog/            28 wpisów w MDX + manifest migracji
content/legal/           regulamin, cookies, formularz żywieniowy
scripts/                 migracja i audyty
```

## Zasady, których warto się trzymać

- **Kolor niesie znaczenie.** Zielony = dietetyka, śliwkowy = strefa zabiegowa.
  Żadna powierzchnia nie miesza obu jako wiodących.
- **Tylko tokeny.** Surowe wartości hex i px w `.ts`/`.tsx` są blokowane przez
  ESLint. Wyjątki wymagają komentarza z uzasadnieniem.
- **Ceny mają jedno źródło.** `src/content/pricing.ts` zasila `/cennik`, strony
  zabiegowe i dane strukturalne `Offer`.
- **Ton.** Forma „Ty/Twój", nigdy „Pan/Pani". Bez emoji. CTA zawsze mówi, co się
  wydarzy („Zapisz się na konsultację", nie „Kliknij tutaj").
- **Treści blogowe nie są pisane ręcznie** — pochodzą z migracji. Zmiany rób
  w `content/blog/*.mdx`, nie przez ponowne uruchomienie skryptu (nadpisze je).

## Wdrożenie

1. Podłącz repozytorium do Vercela (framework wykrywa się sam).
2. Ustaw zmienne z `.env.example` w ustawieniach projektu.
3. Zweryfikuj domenę w Resend (rekordy SPF/DKIM w DNS).
4. **Przed przełączeniem DNS** rozstrzygnij kwestię sklepu — patrz niżej.

## Otwarte kwestie

Wymagają decyzji klientki przed uruchomieniem produkcyjnym:

1. **Sklep.** `/e-sklep` prezentuje oba kupony po 270 zł i prowadzi zamówienie
   przez formularz i przelew — dokładnie tak, jak działał stary sklep. Docelowo:
   Stripe Payment Links (rekomendacja) albo WooCommerce na subdomenie.
2. **Oferta on-line.** Treść osieroconej strony `odchudzanie-on-line-old` leży
   w `src/content/online-offer.ts`, ale nie jest publikowana — ceny mogą być
   nieaktualne. Do potwierdzenia i włączenia albo skasowania.
3. **Polityka prywatności.** Klauzula RODO powstała na podstawie realnych danych
   rejestrowych, ale wymaga weryfikacji prawnej — zwłaszcza okresy retencji
   i podstawa przetwarzania danych o zdrowiu.
4. **Kod pocztowy** gabinetu — przyjęto 07-100, do potwierdzenia.
5. **Triaż bloga.** Wszystkie 28 wpisów przeniesiono; 13 pochodzi z lat 2015–2017
   i wyświetla się z etykietą „Archiwalny". Do decyzji, które odświeżyć.

## Czego brakuje w materiałach

Portret Magdaleny i Katarzyny · zdjęcia metamorfoz wraz ze zgodami pacjentów na
publikację · filmy z zabiegów. Do czasu ich dostarczenia w tych miejscach
renderują się opisane placeholdery (`ImageSlot`, `VideoSlot`), nie puste dziury.

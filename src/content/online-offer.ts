/**
 * Ready-made online diets and training plans.
 *
 * ⚠️ NOT PUBLISHED — no route renders this yet, on purpose.
 *
 * The source is /odchudzanie-on-line-old/ on the current site: an orphaned page
 * (nothing links to it) whose slug literally says "old". The prices below may
 * therefore be stale, and publishing stale prices for a health service is worse
 * than not publishing them.
 *
 * Kept in the repo so the content is not lost in the migration. To publish:
 * confirm with the client that the offer is still running and that the prices
 * hold, then add a route that reads this module — everything else is ready.
 *
 * See "Decyzje do podjęcia" #3 in the implementation plan.
 */

export interface OnlineProduct {
  name: string;
  price: number;
  note?: string;
}

export const onlineDiets: OnlineProduct[] = [
  {
    name: 'Dieta indywidualna',
    price: 199,
    note: 'Opracowywana i wysyłana w ciągu 7 dni od otrzymania wypełnionego formularza żywieniowo-zdrowotnego.',
  },
  {
    name: 'Dieta w schorzeniach',
    price: 249,
    note: 'Cukrzyca typu II, nadciśnienie tętnicze, dna moczanowa.',
  },
  { name: 'Dieta dla osób aktywnych 2500 kcal', price: 149 },
  { name: 'Dieta redukcyjna', price: 149, note: 'Do wyboru: 1300, 1400 lub 1500 kcal.' },
  { name: 'Dieta bezglutenowa 1700 kcal', price: 149 },
  { name: 'Dieta wegetariańska 1600 kcal', price: 149 },
  { name: '1-dniowa dieta oczyszczająca', price: 49 },
  { name: 'Kurs odchudzania i zdrowego odżywiania', price: 59 },
];

export const onlineTraining: OnlineProduct[] = [
  { name: 'Domowy plan treningowy', price: 79 },
  { name: 'Plan treningowy na siłownię', price: 79 },
];

export const onlineOrderingNote =
  'Zamówienie składasz mailowo. Dietę lub plan treningowy otrzymujesz mailem od razu po zaksięgowaniu płatności. Dokonanie płatności oznacza akceptację regulaminu.';

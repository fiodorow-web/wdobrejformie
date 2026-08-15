import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/** Every route a visitor can reach from the navigation. */
const ROUTES = [
  '/',
  '/oferta',
  '/konsultacje',
  '/plany-zywieniowe',
  '/analiza-skladu-ciala',
  '/przygotowanie-do-wizyty',
  '/modelowanie-sylwetki',
  '/modelowanie-sylwetki/kriolipoliza',
  '/cennik',
  '/promocje',
  '/metamorfozy',
  '/poznajmy-sie',
  '/blog',
  '/blog/fala-radiowa-sekret-jedrnego-ciala-i-wygladzonej-skory',
  '/kontakt',
  '/e-sklep',
  '/regulamin',
  '/polityka-prywatnosci',
  '/formularz-zywieniowy',
];

test.describe('smoke', () => {
  for (const route of ROUTES) {
    test(`${route} renders`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      // Exactly one H1 per page — the prototype used an H2 in the hero.
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page).toHaveTitle(/.+/);
      await expect(page.locator('h1')).not.toBeEmpty();
    });
  }
});

/**
 * Sections fade in on scroll. axe composites colours against what is painted,
 * so measuring mid-fade reports blended values that no user ever sees. Scroll
 * the whole page first so every reveal has settled, then measure.
 */
async function settleReveals(page: import('@playwright/test').Page) {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(700);
}

test.describe('accessibility', () => {
  for (const route of ROUTES) {
    test(`${route} has no serious axe violations`, async ({ page }) => {
      await page.goto(route);
      await settleReveals(page);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const blocking = results.violations.filter((violation) =>
        ['critical', 'serious'].includes(violation.impact ?? ''),
      );

      expect(
        blocking,
        blocking.map((v) => `${v.id}: ${v.help} (${v.nodes.length}×)`).join('\n'),
      ).toEqual([]);
    });
  }
});

test.describe('keyboard', () => {
  test('skip link reaches the main content', async ({ page, browserName }) => {
    // WebKit only tabs to links when the OS "Press Tab to highlight each item"
    // preference is on, so Tab order cannot be asserted there. The link itself
    // is verified by the axe pass on every route.
    test.skip(browserName === 'webkit', 'WebKit does not tab to links by default');

    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.locator('.skip-link');
    await expect(skip).toBeFocused();
    await skip.press('Enter');
    await expect(page.locator('#main')).toBeVisible();
  });

  test('pricing tabs respond to arrow keys', async ({ page }) => {
    await page.goto('/cennik');
    const first = page.getByRole('tab', { name: 'Osoby zdrowe' });
    await first.focus();
    await expect(first).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Osoby ze schorzeniami' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  test('deep link opens the matching pricing tab', async ({ page }) => {
    await page.goto('/cennik#modelowanie-sylwetki');
    await expect(page.getByRole('tab', { name: 'Modelowanie sylwetki' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  test('accordion toggles with the keyboard', async ({ page }) => {
    await page.goto('/');
    const trigger = page.getByRole('button', { name: /Czy dostanę listę zakazanych/ });
    await trigger.focus();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await trigger.press('Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('navigation', () => {
  test('mobile menu opens and closes with Escape', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile-only behaviour');

    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Otwórz menu' });
    await toggle.click();
    await expect(page.getByRole('button', { name: 'Zamknij menu' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Otwórz menu' })).toBeVisible();
  });

  test('desktop submenu exposes its items', async ({ page, isMobile }) => {
    test.skip(isMobile, 'desktop-only behaviour');

    await page.goto('/');
    const disclosure = page.getByRole('button', { name: 'Oferta' });
    await expect(disclosure).toHaveAttribute('aria-expanded', 'false');

    await disclosure.click();
    await expect(disclosure).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('link', { name: /Analiza składu ciała/ }).first()).toBeVisible();
  });
});

test.describe('contact form', () => {
  test('rejects a submission without consent', async ({ page }) => {
    await page.goto('/kontakt');

    await page.getByLabel('Imię i nazwisko').fill('Jan Testowy');
    await page.getByLabel('Adres e-mail').fill('jan@example.com');
    // Match by role — "Wiadomość" alone also matches the consent checkbox label.
    await page
      .getByRole('textbox', { name: 'Wiadomość' })
      .fill('To jest testowa wiadomość o wystarczającej długości.');
    await page.getByRole('button', { name: 'Wyślij wiadomość' }).click();

    // The form sets noValidate so the server action is the single source of
    // truth for validation. Without consent it must refuse, name the field, and
    // keep the form on screen rather than reporting success.
    const status = page.getByRole('status');
    await expect(status).toBeVisible();
    await expect(status).toContainText('Popraw zaznaczone pola');
    await expect(page.getByText('Bez zgody nie możemy odpowiedzieć')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Wyślij wiadomość' })).toBeVisible();
  });
});

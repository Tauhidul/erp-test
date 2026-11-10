import { test as base, expect, type Page, type Response } from '@playwright/test';

/** Third-party ad/tracking hosts that load heavily on w3schools.com and cause flaky, slow tests. */
export const AD_HOSTS =
  /googlesyndication|doubleclick|googletagservices|adservice\.google|criteo|pubmatic|openx|gumgum|connectad|33across|bliink|e-planning|yellowblue|amazon-adsystem|adnxs|rubiconproject|casalemedia|snigel/i;

/** Consent dialog (Funding Choices). It only shows up in some regions, mostly the EU. */
const CONSENT_ROOT = '.fc-consent-root';
const CONSENT_ACCEPT = /consent|accept|agree|zustimmen|akzeptieren/i;

/** Clicks "accept" in the consent dialog if it is showing right now. Does nothing otherwise. */
export async function dismissConsent(page: Page): Promise<void> {
  const root = page.locator(CONSENT_ROOT);
  if (await root.isVisible().catch(() => false)) {
    await root.getByRole('button', { name: CONSENT_ACCEPT }).first().click();
  }
}

/** Navigates without waiting for ads (`networkidle` never settles on this site). */
export async function gotoPage(page: Page, path: string): Promise<Response | null> {
  return page.goto(path, { waitUntil: 'domcontentloaded' });
}

/** True when the page background is dark (used for the dark-mode tests). */
export async function isDarkTheme(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const parse = (c: string) => (c.match(/[\d.]+/g) ?? []).map(Number);
    for (const el of [document.body, document.documentElement]) {
      const [r, g, b, a = 1] = parse(getComputedStyle(el).backgroundColor);
      if (r === undefined || g === undefined || b === undefined || a === 0) continue; // transparent: try the next element
      return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.5;
    }
    return false;
  });
}

/**
 * `test` for the W3Schools suite:
 *  - blocks ad hosts on every page in the context (`test.use({ blockAds: false })` turns it off)
 *  - accepts the consent dialog automatically whenever it gets in the way of an action
 */
export const test = base.extend<{ blockAds: boolean }>({
  blockAds: [true, { option: true }],
  context: async ({ context, blockAds }, use) => {
    if (blockAds) {
      await context.route(AD_HOSTS, (route) => route.abort());
    }
    await use(context);
  },
  page: async ({ page }, use) => {
    await page.addLocatorHandler(page.locator(CONSENT_ROOT), async () => {
      await page.locator(CONSENT_ROOT).getByRole('button', { name: CONSENT_ACCEPT }).first().click();
    });
    await use(page);
  },
});

export { expect };

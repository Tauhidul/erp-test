import { test, expect, gotoPage, dismissConsent } from '../fixtures';
import { SEL } from '../selectors';

// Pretend to be in Germany so the consent dialog has a chance to appear.
test.use({ locale: 'de-DE', timezoneId: 'Europe/Berlin' });

test.describe('Robustness and Edge Cases', () => {
  test('Consent banner in an EU locale', async ({ page }) => {
    await gotoPage(page, '/python/');
    // Give the consent script a moment; it may legitimately not show at all.
    await page.locator('.fc-consent-root').waitFor({ state: 'visible', timeout: 5_000 }).catch(() => {});

    if (await page.locator('.fc-consent-root').isVisible()) {
      await dismissConsent(page);
      await expect(page.locator('.fc-consent-root')).toBeHidden();
    }

    // Either way, the page is usable afterwards.
    await page.locator(SEL.main).getByRole('link', { name: /Next/ }).first().click();
    await expect(page).toHaveURL(/python_intro\.asp$/);
  });
});

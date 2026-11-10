import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

// Ads are blocked by default in this suite; this makes that explicit for the scenario.
test.use({ blockAds: true });

test.describe('Robustness and Edge Cases', () => {
  test('Page works with ads blocked', async ({ page }) => {
    await gotoPage(page, '/python/');

    await expect(page.locator(SEL.mainH1)).toBeVisible();
    await expect(page.locator(SEL.sidebar)).toBeVisible();
    await expect(page.locator(SEL.main).getByRole('link', { name: /Next/ }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Try it Yourself/ }).first()).toBeVisible();

    await page.locator(SEL.main).getByRole('link', { name: /Next/ }).first().click();
    await expect(page).toHaveURL(/python_intro\.asp$/);
  });
});

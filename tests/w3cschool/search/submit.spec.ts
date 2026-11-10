import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Site Search', () => {
  test('Submit a search with Enter', async ({ page }) => {
    await gotoPage(page, '/python/');

    await page.locator(SEL.searchInput).fill('python dictionary');
    await page.locator(SEL.searchInput).press('Enter');

    // Either a results page or a direct jump to a tutorial; results come from a third party,
    // so we assert that we moved on and w3schools links exist, not their order.
    await expect(page).not.toHaveURL(/\/python\/$/, { timeout: 20_000 });
    await expect(page.locator('a[href*="w3schools.com"], a[href^="/"]').first()).toBeVisible();
  });
});

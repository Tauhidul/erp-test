import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Site Search', () => {
  test('Suggestions for a valid term', async ({ page }) => {
    await gotoPage(page, '/python/');

    await page.locator(SEL.searchInput).pressSequentially('python list', { delay: 80 });
    const suggestions = page.locator(SEL.searchSuggestions);
    await expect(suggestions).toBeVisible();
    await expect(suggestions.locator('a, li').filter({ hasText: /list/i }).first()).toBeVisible();

    await suggestions.locator('a').first().click();
    await expect(page).toHaveURL(/w3schools\.com/);
    await expect(page).not.toHaveURL(/\/python\/$/);
  });
});

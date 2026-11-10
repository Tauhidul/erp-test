import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Site Search', () => {
  test('Gibberish term', async ({ page }) => {
    await gotoPage(page, '/python/');
    const input = page.locator(SEL.searchInput);

    await input.pressSequentially('zxqvbnmkjhgf123', { delay: 60 });
    await expect(page.locator(`${SEL.searchSuggestions} a`)).toHaveCount(0);

    await input.press('Enter');
    // No crash or error page, whatever the results page looks like.
    await expect(page.locator('body')).not.toContainText(/internal server error|502 bad gateway|503/i);
    await expect(page.locator('body')).toBeVisible();
  });
});

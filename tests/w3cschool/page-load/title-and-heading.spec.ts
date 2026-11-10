import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Page Load and Content', () => {
  test('Landing page loads with correct title and main heading', async ({ page }) => {
    const response = await gotoPage(page, '/python/');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle('Python Tutorial');

    const h1 = page.locator(SEL.mainH1);
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText('Python Tutorial');
  });
});

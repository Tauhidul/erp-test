import { test, expect, gotoPage } from './fixtures';

test.describe('W3Schools Python tutorial', () => {
  test('seed', async ({ page }) => {
    await gotoPage(page, '/python/');
    await expect(page).toHaveTitle(/Python Tutorial/i);
  });
});

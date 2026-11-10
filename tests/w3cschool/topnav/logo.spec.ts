import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Top Navigation Bar', () => {
  test('Logo navigates to home', async ({ page }) => {
    await gotoPage(page, '/python/');
    await page.getByLabel(SEL.logoLabel).first().click();

    await expect(page).toHaveURL('https://www.w3schools.com/');
    await expect(page).toHaveTitle(/W3Schools/i);
  });
});

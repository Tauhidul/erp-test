import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Lesson Navigation Buttons', () => {
  test('Home goes to the site home page', async ({ page }) => {
    await gotoPage(page, '/python/');

    await page.locator(SEL.main).getByRole('link', { name: /Home/ }).first().click();
    await expect(page).toHaveURL(/w3schools\.com\/(default\.asp)?$/);
  });
});

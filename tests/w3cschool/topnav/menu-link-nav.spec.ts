import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Top Navigation Bar', () => {
  test('Link inside a menu navigates', async ({ page }) => {
    await gotoPage(page, '/python/');

    await page.locator(SEL.navTutorials).click();
    await page.locator(SEL.panelTutorials).getByRole('link', { name: 'Learn HTML' }).first().click();

    await expect(page).toHaveURL(/\/html\//);
    await expect(page).toHaveTitle(/HTML Tutorial/i);
  });
});

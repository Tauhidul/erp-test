import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Top Navigation Bar', () => {
  test('Tutorials menu opens and closes', async ({ page }) => {
    await gotoPage(page, '/python/');

    await page.locator(SEL.navTutorials).click();
    const panel = page.locator(SEL.panelTutorials);
    await expect(panel).toBeVisible();
    await expect(panel.locator('a[href*="/python/"]').first()).toBeVisible();

    await page.locator(SEL.navTutorials).click();
    await expect(panel).toBeHidden();
  });
});

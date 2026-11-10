import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Top Navigation Bar', () => {
  test('References, Exercises, Certificates and Services menus', async ({ page }) => {
    await gotoPage(page, '/python/');

    await page.locator(SEL.navReferences).click();
    await expect(page.locator(SEL.panelReferences)).toBeVisible();
    await expect(page.locator(SEL.panelReferences).locator('a[href*="python"]').first()).toBeVisible();

    // Opening another menu closes the previous one.
    await page.locator(SEL.navExercises).click();
    await expect(page.locator(SEL.panelReferences)).toBeHidden();
    await expect(page.locator(SEL.panelExercises)).toBeVisible();

    await page.locator(SEL.navCertified).click();
    await expect(page.locator(SEL.panelCertified)).toBeVisible();

    await page.locator(SEL.navServices).click();
    await expect(page.locator(SEL.panelServices)).toBeVisible();
  });
});

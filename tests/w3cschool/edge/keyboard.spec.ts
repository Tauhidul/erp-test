import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.use({ viewport: { width: 1280, height: 800 } });

test.describe('Robustness and Edge Cases', () => {
  test('Keyboard access', async ({ page }) => {
    await gotoPage(page, '/python/');

    // Tab until each target has focus (bounded, so a missing target fails instead of looping).
    const tabTo = async (selector: string) => {
      for (let i = 0; i < 30; i++) {
        await page.keyboard.press('Tab');
        if (await page.locator(selector).evaluate((el) => el === document.activeElement).catch(() => false)) {
          return;
        }
      }
      throw new Error(`Tab never reached ${selector}`);
    };

    await tabTo('#w3-logo');
    await tabTo(SEL.navTutorials);
    await expect(page.locator(SEL.navTutorials)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator(SEL.panelTutorials)).toBeVisible();

    await page.keyboard.press('Escape');
    await tabTo(SEL.searchInput);
    await expect(page.locator(SEL.searchInput)).toBeFocused();
  });
});

import { test, expect, gotoPage, isDarkTheme } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Top Navigation Bar', () => {
  test('Dark mode toggle', async ({ page }) => {
    await gotoPage(page, '/python/');
    // The checkbox itself is visually hidden, so click its visible wrapper.
    const toggle = () => page.locator('#toggle-darkmode-wrapper, label[for="darkToggle"]').first();
    expect(await isDarkTheme(page)).toBe(false);

    await toggle().click();
    await expect(page.locator(SEL.darkToggle)).toBeChecked();
    await expect.poll(() => isDarkTheme(page)).toBe(true);

    // The choice survives a reload.
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.locator(SEL.darkToggle)).toBeChecked();
    await expect.poll(() => isDarkTheme(page)).toBe(true);

    await toggle().click();
    await expect(page.locator(SEL.darkToggle)).not.toBeChecked();
    await expect.poll(() => isDarkTheme(page)).toBe(false);
  });
});

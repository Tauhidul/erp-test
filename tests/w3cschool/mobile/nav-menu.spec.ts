import { test, expect, gotoPage, isDarkTheme } from '../fixtures';
import { SEL } from '../selectors';

test.use({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });

test.describe('Responsive / Mobile', () => {
  test('Mobile menu and dark mode', async ({ page }) => {
    await gotoPage(page, '/python/');

    // UNVERIFIED: how the mobile top menu opens. Adjust SEL.mobileNav if this fails.
    const mobileNav = page.locator(SEL.mobileNav);
    await expect(mobileNav).toBeAttached();
    for (const label of [/Tutorials/i, /References/i, /Exercises/i, /Certificates/i, /Services/i]) {
      await expect(mobileNav.getByText(label).first(), String(label)).toBeAttached();
    }

    await page.locator(SEL.darkToggleSmall).evaluate((el: HTMLInputElement) => el.click());
    await expect(page.locator(SEL.darkToggleSmall)).toBeChecked();
    await expect.poll(() => isDarkTheme(page)).toBe(true);
  });
});

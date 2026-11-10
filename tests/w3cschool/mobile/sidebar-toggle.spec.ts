import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.use({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });

test.describe('Responsive / Mobile', () => {
  test('Mobile sidebar toggle', async ({ page }) => {
    await gotoPage(page, '/python/');

    // UNVERIFIED selector: the button that opens the tutorial menu on a phone.
    await page.locator(SEL.mobileSidebarToggle).first().tap();
    await expect(page.locator(SEL.sidebarOuter)).toBeVisible();
    await expect(page.locator(`${SEL.sidebar} a[href="default.asp"]`).first()).toHaveClass(/active/);

    await page.locator(`${SEL.sidebar} a[href="python_intro.asp"]`).first().tap();
    await expect(page).toHaveURL(/python_intro\.asp$/);
    await expect(page.locator(SEL.sidebarOuter)).toBeHidden();
  });
});

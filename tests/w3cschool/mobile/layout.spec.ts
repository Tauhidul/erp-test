import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.use({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });

test.describe('Responsive / Mobile', () => {
  test('Mobile layout', async ({ page }) => {
    await gotoPage(page, '/python/');

    await expect(page.locator(SEL.mainH1)).toBeVisible();
    await expect(page.locator(SEL.mainH1)).toContainText('Python Tutorial');
    await expect(page.locator(SEL.sidebarOuter)).toBeHidden();
    // The desktop top-nav buttons fold away on a phone.
    await expect(page.locator(SEL.navTutorials)).toBeHidden();
  });
});

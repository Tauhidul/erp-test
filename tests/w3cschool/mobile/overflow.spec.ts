import { test, expect, gotoPage } from '../fixtures';

test.use({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });

test.describe('Responsive / Mobile', () => {
  test('No sideways overflow', async ({ page }) => {
    await gotoPage(page, '/python/');

    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    // Soft: ad slots can push the page wider, which shouldn't hide other failures.
    expect.soft(scrollWidth, `page is ${scrollWidth}px wide in a ${clientWidth}px viewport`).toBeLessThanOrEqual(
      clientWidth + 1,
    );
  });
});

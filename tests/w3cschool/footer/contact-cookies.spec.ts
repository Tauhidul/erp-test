import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Footer', () => {
  test('Contact Us and Cookies controls', async ({ page }) => {
    await gotoPage(page, '/python/');
    const footer = page.locator(SEL.footer);
    await footer.scrollIntoViewIfNeeded();
    const startUrl = page.url();

    // Both are JavaScript controls with no href, so the page must stay where it is.
    await footer.getByText(/CONTACT US/i).first().click();
    await expect(page.locator(SEL.anyVisibleDialog).first()).toBeVisible();
    expect(page.url()).toBe(startUrl);
    await page.keyboard.press('Escape');

    await footer.getByText(/cookies/i).first().click();
    await expect(page.locator(SEL.anyVisibleDialog).first()).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator(SEL.anyVisibleDialog)).toHaveCount(0);
  });
});

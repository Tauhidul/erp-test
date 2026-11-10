import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Top Navigation Bar', () => {
  test('Sign In opens login', async ({ page }) => {
    await gotoPage(page, '/python/');
    await page.locator(SEL.loginButton).click();

    // Either a redirect to the profile site, or a login dialog on the same page.
    await expect
      .poll(
        async () =>
          /profile\.w3schools\.com/.test(page.url()) ||
          (await page.locator(SEL.anyVisibleDialog).count()) > 0,
        { message: 'expected a login page or a login dialog', timeout: 15_000 },
      )
      .toBe(true);
    // No credentials are ever typed or submitted here.
  });
});

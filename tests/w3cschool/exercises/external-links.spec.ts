import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Exercises, Examples, Quiz and References', () => {
  test('External link targets', async ({ page }) => {
    await gotoPage(page, '/python/');
    const main = page.locator(SEL.main);

    // Only the hrefs are checked; the test never leaves for third-party sites.
    await expect(main.locator('a[href^="https://python.org"]').first()).toHaveAttribute(
      'href',
      'https://python.org/',
    );
    const certified = main.getByRole('link', { name: /Get Certified Today/i }).first();
    await expect(certified).toHaveAttribute('href', /campus\.w3schools\.com/);
    await expect(certified).toHaveAttribute('href', /python-course/);
  });
});

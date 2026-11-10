import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Try it Yourself Editor', () => {
  test('Editor opens in a new tab and shows output', async ({ page, context }) => {
    await gotoPage(page, '/python/');

    const [tryit] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: /Try it Yourself/ }).first().click(),
    ]);
    await tryit.waitForLoadState('domcontentloaded');

    await expect(tryit).toHaveURL(/trypython\.asp\?filename=demo_default/);
    expect(page.url()).toMatch(/\/python\/$/); // the original tab stays put

    await expect(tryit.locator(SEL.tryitEditor).first()).toContainText('print("Hello, World!")', {
      timeout: 30_000,
    });
    // The result panel is a server-side run, so give it time.
    await expect(tryit.locator('body')).toContainText('Hello, World!', { timeout: 30_000 });
  });
});

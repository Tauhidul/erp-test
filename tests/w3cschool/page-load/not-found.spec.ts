import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Page Load and Content', () => {
  test('Non-existent lesson URL shows not-found page', async ({ page }) => {
    const response = await gotoPage(page, '/python/python_doesnotexist_xyz.asp');

    // Either a real 404, or the site's own friendly not-found page.
    const status = response?.status() ?? 0;
    const looksNotFound = status === 404 || (await page.getByText(/not found|404/i).count()) > 0;
    expect(looksNotFound, `status ${status}, no "not found" text on page`).toBe(true);

    // None of the real lesson content appears.
    await expect(page.locator(SEL.mainH1).filter({ hasText: 'Python Tutorial' })).toHaveCount(0);
    await expect(page.locator(SEL.codeBlock).filter({ hasText: 'Hello, World!' })).toHaveCount(0);
  });
});

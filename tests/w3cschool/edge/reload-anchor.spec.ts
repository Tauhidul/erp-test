import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.use({ viewport: { width: 1280, height: 800 } });

test.describe('Robustness and Edge Cases', () => {
  test('Reload keeps the page state', async ({ page }) => {
    await gotoPage(page, '/python/python_intro.asp');
    await page.reload({ waitUntil: 'domcontentloaded' });

    await expect(page).toHaveURL(/python_intro\.asp$/);
    await expect(page.locator(SEL.mainH1)).toContainText('Python Introduction');
    await expect(page.locator(`${SEL.sidebar} a[href="python_intro.asp"]`).first()).toHaveClass(/active/);
  });

  test('/python/default.asp shows the same page as /python/', async ({ page }) => {
    await gotoPage(page, '/python/default.asp');
    await expect(page.locator(SEL.mainH1)).toContainText('Python Tutorial');
    await expect(page).toHaveTitle('Python Tutorial');
  });
});

import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.use({ viewport: { width: 1280, height: 800 } });

test.describe('Lesson Navigation Buttons', () => {
  test('Browser back and forward', async ({ page }) => {
    await gotoPage(page, '/python/');
    const next = () => page.locator(SEL.main).getByRole('link', { name: /Next/ }).first();

    await next().click();
    await expect(page).toHaveURL(/python_intro\.asp$/);
    await next().click();
    await expect(page).toHaveURL(/python_getstarted\.asp$/);

    await page.goBack({ waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/python_intro\.asp$/);
    await expect(page.locator(`${SEL.sidebar} a[href="python_intro.asp"]`).first()).toHaveClass(/active/);

    await page.goBack({ waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/python\/$/);

    await page.goForward({ waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/python_intro\.asp$/);
  });
});

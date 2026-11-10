import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.use({ viewport: { width: 1280, height: 800 } });

test.describe('Left Sidebar Menu', () => {
  test('Clicking an item navigates and highlights it', async ({ page }) => {
    await gotoPage(page, '/python/');
    const link = (href: string) => page.locator(`${SEL.sidebar} a[href="${href}"]`).first();

    await link('python_intro.asp').click();
    await expect(page).toHaveURL(/python_intro\.asp$/);
    await expect(page.locator(SEL.mainH1)).toContainText('Python Introduction');
    await expect(link('python_intro.asp')).toHaveClass(/active/);
    await expect(link('default.asp')).not.toHaveClass(/active/);

    await link('python_getstarted.asp').click();
    await expect(page).toHaveURL(/python_getstarted\.asp$/);
    await expect(link('python_getstarted.asp')).toHaveClass(/active/);
  });
});

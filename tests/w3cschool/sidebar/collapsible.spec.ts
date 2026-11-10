import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.use({ viewport: { width: 1280, height: 800 } });

test.describe('Left Sidebar Menu', () => {
  test('A sidebar group expands', async ({ page }) => {
    await gotoPage(page, '/python/');
    const sidebar = page.locator(SEL.sidebar);

    await sidebar.locator('a[href="python_syntax.asp"]').first().click();
    await expect(page).toHaveURL(/python_syntax\.asp$/);

    const statements = sidebar.locator('a[href="python_statements.asp"]').first();
    await expect(statements).toBeVisible();
    await expect(sidebar.locator('a[href="python_syntax.asp"]').first()).toBeVisible();

    await statements.click();
    await expect(page).toHaveURL(/python_statements\.asp$/);
    await expect(sidebar.locator('a[href="python_statements.asp"]').first()).toHaveClass(/active/);
  });
});

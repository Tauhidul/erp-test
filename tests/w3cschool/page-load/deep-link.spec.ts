import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Page Load and Content', () => {
  test('Deep link to a lesson loads directly', async ({ page }) => {
    await gotoPage(page, '/python/python_variables.asp');

    await expect(page).toHaveTitle(/Python Variables/);
    await expect(page.locator(SEL.mainH1)).toContainText('Python Variables');
    await expect(
      page.locator(`${SEL.sidebar} a[href="python_variables.asp"]`).first(),
    ).toHaveClass(/active/);
  });
});

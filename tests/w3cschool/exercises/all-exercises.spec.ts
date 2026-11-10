import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Exercises, Examples, Quiz and References', () => {
  test('See all Python Exercises', async ({ page }) => {
    await gotoPage(page, '/python/');

    await page.locator(SEL.main).getByRole('link', { name: /See all Python Exercises/i }).click();
    await expect(page).toHaveURL(/python_exercises\.asp$/);
    await expect(page.locator(SEL.mainH1)).toContainText('Exercises');
  });
});

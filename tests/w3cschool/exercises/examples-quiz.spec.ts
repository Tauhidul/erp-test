import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Exercises, Examples, Quiz and References', () => {
  test('Examples and Quiz links', async ({ page }) => {
    await gotoPage(page, '/python/');
    const main = page.locator(SEL.main);

    await main.getByRole('link', { name: /See All Python Examples/i }).click();
    await expect(page).toHaveURL(/python_examples\.asp$/);

    await page.goBack({ waitUntil: 'domcontentloaded' });
    await main.locator('a[href="python_quiz.asp"]').first().click();
    await expect(page).toHaveURL(/python_quiz\.asp$/);
    await expect(page.getByRole('link', { name: /Start (the )?(Python )?Quiz/i }).first()).toBeVisible();
  });
});

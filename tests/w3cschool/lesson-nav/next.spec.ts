import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Lesson Navigation Buttons', () => {
  test('Next goes to Python Intro', async ({ page }) => {
    await gotoPage(page, '/python/');

    await page.locator(SEL.main).getByRole('link', { name: /Next/ }).first().click();
    await expect(page).toHaveURL(/python_intro\.asp$/);

    await page.locator(SEL.main).getByRole('link', { name: /Next/ }).first().click();
    await expect(page).toHaveURL(/python_getstarted\.asp$/);
  });
});

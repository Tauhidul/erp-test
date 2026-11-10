import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Lesson Navigation Buttons', () => {
  test('Previous on an inner lesson', async ({ page }) => {
    await gotoPage(page, '/python/python_intro.asp');

    await page.locator(SEL.main).getByRole('link', { name: /Previous/ }).first().click();
    await expect(page).toHaveURL(/\/python\/(default\.asp)?$/);
    await expect(page.locator(SEL.mainH1)).toContainText('Python Tutorial');
  });
});

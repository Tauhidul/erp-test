import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Lesson Navigation Buttons', () => {
  test('Top and bottom buttons match', async ({ page }) => {
    await gotoPage(page, '/python/');
    const main = page.locator(SEL.main);
    const next = main.getByRole('link', { name: /Next/ });
    const home = main.getByRole('link', { name: /Home/ });

    await expect(next).toHaveCount(2);
    await expect(home).toHaveCount(2);
    for (const link of await next.all()) await expect(link).toHaveAttribute('href', 'python_intro.asp');
    for (const link of await home.all()) await expect(link).toHaveAttribute('href', '/default.asp');

    await next.last().click();
    await expect(page).toHaveURL(/python_intro\.asp$/);
  });
});

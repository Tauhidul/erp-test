import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Exercises, Examples, Quiz and References', () => {
  test('File handling and database links', async ({ page }) => {
    await gotoPage(page, '/python/');
    const main = page.locator(SEL.main);

    await main.getByRole('link', { name: 'Python File Handling' }).first().click();
    await expect(page).toHaveURL(/python_file_handling\.asp$/);

    await page.goBack({ waitUntil: 'domcontentloaded' });
    await main.getByRole('link', { name: 'Python MySQL Tutorial' }).first().click();
    await expect(page).toHaveURL(/python_mysql_getstarted\.asp$/);

    await page.goBack({ waitUntil: 'domcontentloaded' });
    await main.getByRole('link', { name: 'Python MongoDB Tutorial' }).first().click();
    await expect(page).toHaveURL(/python_mongodb_getstarted\.asp$/);
  });
});

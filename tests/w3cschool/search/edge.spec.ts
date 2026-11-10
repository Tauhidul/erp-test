import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Site Search', () => {
  test('Empty input does nothing harmful', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await gotoPage(page, '/python/');
    await page.locator(SEL.searchInput).focus();
    await page.keyboard.press('Enter');

    await expect(page.locator('body')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('Script-injection input is treated as plain text', async ({ page }) => {
    let dialogSeen = false;
    page.on('dialog', async (dialog) => {
      dialogSeen = true;
      await dialog.dismiss();
    });

    await gotoPage(page, '/python/');
    await page.locator(SEL.searchInput).fill('<script>alert(1)</script>');
    await page.locator(SEL.searchInput).press('Enter');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2_000); // give an injected script time to fire, if it were going to

    expect(dialogSeen, 'an alert() dialog appeared').toBe(false);
  });
});

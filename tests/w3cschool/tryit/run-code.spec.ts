import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Try it Yourself Editor', () => {
  test('Edit and run code', async ({ page }) => {
    await gotoPage(page, '/python/trypython.asp?filename=demo_default');

    const editor = page.locator(SEL.tryitEditor).first();
    await expect(editor).toBeVisible({ timeout: 30_000 });
    await editor.click();
    await page.keyboard.press('ControlOrMeta+A');
    await page.keyboard.type('print(2 + 3)');

    await page.getByRole('button', { name: /Run/ }).click();
    // Output lands in the result panel, which is slow because it runs on the server.
    await expect(page.locator(SEL.tryitResultFrame)).toBeVisible();
    await expect
      .poll(async () => (await page.locator(SEL.tryitResultFrame).innerText().catch(() => '')).trim(), {
        timeout: 30_000,
      })
      .toBe('5');
  });
});

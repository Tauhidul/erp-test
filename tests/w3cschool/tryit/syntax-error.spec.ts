import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Try it Yourself Editor', () => {
  test('Invalid code shows an error', async ({ page }) => {
    await gotoPage(page, '/python/trypython.asp?filename=demo_default');

    const editor = page.locator(SEL.tryitEditor).first();
    await expect(editor).toBeVisible({ timeout: 30_000 });
    await editor.click();
    await page.keyboard.press('ControlOrMeta+A');
    await page.keyboard.type('print("unclosed');

    await page.getByRole('button', { name: /Run/ }).click();
    await expect
      .poll(async () => page.locator(SEL.tryitResultFrame).innerText().catch(() => ''), {
        timeout: 30_000,
      })
      .toMatch(/Error/i);
    await expect(editor).toBeVisible(); // the page did not crash
  });
});

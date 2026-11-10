import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Exercises, Examples, Quiz and References', () => {
  test('Inline exercise, wrong answer', async ({ page, context }) => {
    await gotoPage(page, '/python/');
    const exercise = page.locator(SEL.exercise);
    await exercise.scrollIntoViewIfNeeded();

    await exercise.getByText('var x = 5', { exact: true }).click();
    const [result] = await Promise.all([
      context.waitForEvent('page'),
      exercise.getByRole('link', { name: /Submit Answer/ }).click(),
    ]);
    await result.waitForLoadState('domcontentloaded');

    await expect(result).toHaveURL(/exercise\.asp/);
    await expect(result.locator('body')).toContainText(/incorrect|wrong|not correct|try again/i);
  });

  test('Inline exercise, empty answer does not break the page', async ({ page, context }) => {
    await gotoPage(page, '/python/');
    const exercise = page.locator(SEL.exercise);
    await exercise.scrollIntoViewIfNeeded();

    // What the site does here isn't specified (message, no-op or new tab), so only check it stays healthy.
    const popup = context.waitForEvent('page', { timeout: 5_000 }).catch(() => null);
    await exercise.getByRole('link', { name: /Submit Answer/ }).click();
    const result = await popup;
    if (result) await result.close();

    await expect(page.locator(SEL.mainH1)).toContainText('Python Tutorial');
  });
});

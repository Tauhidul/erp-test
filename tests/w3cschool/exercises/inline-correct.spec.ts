import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Exercises, Examples, Quiz and References', () => {
  test('Inline exercise, correct answer', async ({ page, context }) => {
    await gotoPage(page, '/python/');
    const exercise = page.locator(SEL.exercise);
    await exercise.scrollIntoViewIfNeeded();

    // The question text can change, so only check its topic.
    await expect(exercise).toContainText(/variable/i);
    await expect(exercise.getByRole('radio')).toHaveCount(4);
    await expect(exercise.getByRole('link', { name: /Submit Answer/ })).toBeVisible();

    await exercise.getByText('x = 5', { exact: true }).click();
    const [result] = await Promise.all([
      context.waitForEvent('page'),
      exercise.getByRole('link', { name: /Submit Answer/ }).click(),
    ]);
    await result.waitForLoadState('domcontentloaded');

    await expect(result).toHaveURL(/exercise\.asp/);
    await expect(result.locator('body')).toContainText(/correct/i);
    await expect(result.locator('body')).not.toContainText(/incorrect|wrong/i);
  });
});

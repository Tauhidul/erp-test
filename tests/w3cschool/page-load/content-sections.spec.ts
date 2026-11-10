import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

const SECTIONS = [
  'Learn Python',
  'Learning by Examples',
  'Python File Handling',
  'Python Database Handling',
  'Python Exercises',
  'Python Examples',
  'Python Quiz',
  'Python Reference',
  'Download Python',
  'Get Certified in Python',
];

test.describe('Page Load and Content', () => {
  test('Key content sections are present', async ({ page }) => {
    await gotoPage(page, '/python/');

    for (const heading of SECTIONS) {
      await expect(
        page.locator(`${SEL.main} h2`).filter({ hasText: heading }).first(),
        `section "${heading}"`,
      ).toBeVisible();
    }

    await expect(page.locator(SEL.codeBlock).first()).toContainText('print("Hello, World!")');
    await expect(page.getByRole('link', { name: /Try it Yourself/ }).first()).toBeVisible();
  });
});

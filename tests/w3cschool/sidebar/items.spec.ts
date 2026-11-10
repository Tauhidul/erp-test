import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.use({ viewport: { width: 1280, height: 800 } });

test.describe('Left Sidebar Menu', () => {
  test('Sidebar items present and HOME active', async ({ page }) => {
    await gotoPage(page, '/python/');
    const sidebar = page.locator(SEL.sidebar);
    await expect(sidebar).toBeVisible();

    const links = sidebar.locator('a');
    for (const [i, name] of ['Python HOME', 'Python Intro', 'Python Get Started', 'Python Syntax'].entries()) {
      await expect(links.nth(i)).toContainText(name);
    }
    await expect(sidebar.locator('a[href="default.asp"]').first()).toHaveClass(/active/);

    for (const heading of [
      'PYTHON TUTORIAL',
      'FILE HANDLING',
      'PYTHON MODULES',
      'PYTHON MYSQL',
      'PYTHON MONGODB',
      'PYTHON REFERENCE',
      'PYTHON EXAMPLES',
    ]) {
      await expect(sidebar.getByText(heading, { exact: true }).first(), heading).toBeAttached();
    }

    // The menu is long; assert a floor, not an exact count.
    expect(await links.count()).toBeGreaterThan(100);
  });
});

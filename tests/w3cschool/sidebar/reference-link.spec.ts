import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.use({ viewport: { width: 1280, height: 800 } });

test.describe('Left Sidebar Menu', () => {
  test('Sidebar reference link', async ({ page }) => {
    await gotoPage(page, '/python/');
    const sidebar = page.locator(SEL.sidebar);

    // First link after the "PYTHON REFERENCE" heading.
    const heading = sidebar.getByText('PYTHON REFERENCE', { exact: true }).first();
    await heading.scrollIntoViewIfNeeded();
    const first = heading.locator('xpath=following::a[1]');

    const href = await first.getAttribute('href');
    const text = (await first.innerText()).trim();
    expect(href).toBeTruthy();

    await first.click();
    await expect(page).toHaveURL(new RegExp(`${href!.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`));
    await expect(page.locator(SEL.mainH1)).toContainText(text.replace(/^Python\s+/i, ''), {
      ignoreCase: true,
    });
  });
});

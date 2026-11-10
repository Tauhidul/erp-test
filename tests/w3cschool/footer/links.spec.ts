import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

test.describe('Footer', () => {
  test('Footer links navigate', async ({ page }) => {
    await gotoPage(page, '/python/');
    const footer = page.locator(SEL.footer);
    await footer.scrollIntoViewIfNeeded();

    for (const name of [/FORUM/i, /ABOUT/i, /terms of use/i, /privacy policy/i, /CONTACT US/i, /cookies/i]) {
      await expect(footer.getByText(name).first(), String(name)).toBeVisible();
    }
    await expect(footer).toContainText(/Copyright 1999-\d{4}/);

    const visit = async (name: RegExp, url: RegExp) => {
      await footer.getByRole('link', { name }).first().click();
      await expect(page).toHaveURL(url);
      await gotoPage(page, '/python/');
      await footer.scrollIntoViewIfNeeded();
    };
    await visit(/ABOUT/i, /\/about\/default\.asp$/);
    await visit(/privacy policy/i, /\/about\/about_privacy\.asp$/);
    await visit(/terms of use/i, /\/about\/about_copyright\.asp$/);
    await visit(/FORUM/i, /\/forum\/index\.php$/);
  });
});

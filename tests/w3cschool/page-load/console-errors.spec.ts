import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

// Real ads are left on here on purpose: the test proves w3schools.com's own code stays clean
// even while noisy third-party ad frames fail around it.
test.use({ blockAds: false });

test.describe('Page Load and Content', () => {
  test('No console errors from w3schools.com on load', async ({ page }) => {
    const ownErrors: string[] = [];
    const thirdPartyErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() !== 'error') return;
      const url = msg.location().url;
      const entry = `${msg.text()} (${url || 'no url'})`;
      // Errors with no URL come from the page itself; others are judged by host.
      if (!url || /(^|\.)w3schools\.com(\/|:|$)/i.test(new URL(url).host + '/')) {
        ownErrors.push(entry);
      } else {
        thirdPartyErrors.push(entry);
      }
    });
    page.on('pageerror', (err) => {
      if (/w3schools\.com/i.test(err.stack ?? '')) ownErrors.push(`pageerror: ${err.message}`);
    });

    await gotoPage(page, '/python/');
    await expect(page.locator(SEL.mainH1)).toBeVisible();
    await page.waitForTimeout(3_000); // let late scripts run; ads never go network-idle

    test.info().annotations.push({
      type: 'third-party-errors',
      description: `${thirdPartyErrors.length} ignored (ads/tracking)`,
    });
    expect(ownErrors, `Errors from w3schools.com:\n${ownErrors.join('\n')}`).toEqual([]);
  });
});

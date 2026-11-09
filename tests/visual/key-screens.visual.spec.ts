import { test, expect } from '@fixtures';
import { TAG, tags } from '@config/tags';
import { scaffold } from '@helpers/scaffold';

// Baselines are created with `npx playwright test --project=visual --update-snapshots`.
// Never update a baseline only to turn a test green: review the diff first.
test.describe('Visual: key screens', { tag: tags(TAG.VISUAL, TAG.P2) }, () => {
  test('purchase order form layout', async ({ as }) => {
    scaffold();
    const page = await as('buyer');
    await page.goto('/purchase/orders/new');
    await expect(page.getByRole('main')).toHaveScreenshot('purchase-order-form.png');
  });
});

import { test } from '@fixtures';
import { TAG, tags } from '@config/tags';
import { scaffold } from '@helpers/scaffold';
import { PurchaseOrderPage } from '@pages/purchase/purchase-order.page';

// Screen-level regression for the Purchase app. Cross-module flows belong in e2e/processes/.
test.describe(
  'Purchase: purchase order screen',
  { tag: tags(TAG.PURCHASE, TAG.REGRESSION, TAG.BUYER) },
  () => {
    test('saving without a vendor shows a required-field error', { tag: tags(TAG.P1) }, async ({ as }) => {
      scaffold();
      const po = new PurchaseOrderPage(await as('buyer'));
      await po.openNew();
      await po.form.save();
      await po.form.expectError('Vendor is required');
    });

    test('a confirmed order can no longer be edited', { tag: tags(TAG.P1) }, async () => {
      scaffold();
    });
  },
);

import { test } from '@fixtures';
import { TAG, journey, tags } from '@config/tags';
import { requirement } from '@helpers/requirement';
import { scaffold } from '@helpers/scaffold';

test.describe('Order to cash: partial delivery', { tag: tags(TAG.O2C, TAG.REGRESSION, TAG.P1) }, () => {
  test(
    'two partial deliveries produce two invoices that sum to the order total',
    {
      tag: tags(
        journey('partial-delivery'),
        TAG.WAREHOUSE_CLERK,
        TAG.ACCOUNTANT,
        TAG.INVENTORY,
        TAG.ACCOUNTING,
      ),
      annotation: requirement('O2C-020'),
    },
    async () => {
      scaffold();
      await test.step('Deliver 3 of 10 units and invoice them', async () => {});
      await test.step('Deliver the remaining 7 and invoice them', async () => {});
      await test.step('Invoice totals add up to the order total', async () => {});
    },
  );
});

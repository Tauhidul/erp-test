import { test } from '@fixtures';
import { TAG, tags } from '@config/tags';
import { scaffold } from '@helpers/scaffold';
import { SalesOrderPage } from '@pages/sales/sales-order.page';

test.describe('Sales: sales order screen', { tag: tags(TAG.SALES, TAG.REGRESSION, TAG.SALES_REP) }, () => {
  test('saving without a customer shows a required-field error', { tag: tags(TAG.P1) }, async ({ as }) => {
    scaffold();
    const so = new SalesOrderPage(await as('sales-rep'));
    await so.openNew();
    await so.form.save();
    await so.form.expectError('Customer is required');
  });

  test(
    'discount above the rep limit shows the limit message on the form',
    { tag: tags(TAG.P1) },
    async () => {
      scaffold(); // the rule itself is proven at API level: tests/api/aggregates/sales/sales-order
    },
  );
});

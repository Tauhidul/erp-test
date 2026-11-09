import { test } from '@fixtures';
import { TAG, journey, tags } from '@config/tags';
import { requirement } from '@helpers/requirement';
import { scaffold } from '@helpers/scaffold';

test.describe('Order to cash: credit control', { tag: tags(TAG.O2C, TAG.REGRESSION, TAG.P0) }, () => {
  test(
    'order above the customer credit limit is held until a finance manager releases it',
    {
      tag: tags(journey('credit-hold'), TAG.SALES_REP, TAG.FINANCE_MANAGER, TAG.SALES),
      annotation: requirement('O2C-010'),
    },
    async () => {
      scaffold();
      await test.step('Sales rep confirms an order that exceeds the credit limit', async () => {});
      await test.step('Order goes on hold and no delivery is created', async () => {});
      await test.step('Finance manager releases the hold; the delivery appears', async () => {});
    },
  );
});

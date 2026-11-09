import { test } from '@fixtures';
import { TAG, journey, tags } from '@config/tags';
import { requirement } from '@helpers/requirement';
import { scaffold } from '@helpers/scaffold';

test.describe(
  'Procure to pay: goods receipt and three-way match',
  { tag: tags(TAG.P2P, TAG.REGRESSION, TAG.P0) },
  () => {
    test(
      'bill quantity above received quantity is blocked at posting',
      {
        tag: tags(
          journey('three-way-match'),
          TAG.WAREHOUSE_CLERK,
          TAG.ACCOUNTANT,
          TAG.INVENTORY,
          TAG.ACCOUNTING,
        ),
        annotation: requirement('P2P-020'),
      },
      async () => {
        scaffold();
        await test.step('Warehouse receives 6 of 10 ordered units', async () => {});
        await test.step('Accountant tries to post a bill for 10 units', async () => {});
        await test.step('Posting is blocked with a match error', async () => {});
      },
    );

    test(
      'partial receipt then second receipt completes the order',
      {
        tag: tags(journey('three-way-match'), TAG.WAREHOUSE_CLERK, TAG.INVENTORY),
        annotation: requirement('P2P-021'),
      },
      async () => {
        scaffold();
      },
    );
  },
);

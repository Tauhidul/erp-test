import { test } from '@fixtures';
import { TAG, journey, tags } from '@config/tags';
import { requirement } from '@helpers/requirement';
import { scaffold } from '@helpers/scaffold';

test.describe(
  'Procure to pay: requisition and approval',
  { tag: tags(TAG.P2P, TAG.REGRESSION, TAG.P1) },
  () => {
    test(
      'buyer raises a purchase request; finance manager approves; it becomes a purchase order',
      {
        tag: tags(journey('requisition-approval'), TAG.BUYER, TAG.FINANCE_MANAGER, TAG.PURCHASE),
        annotation: requirement('P2P-010'),
      },
      async () => {
        scaffold();
        await test.step('Buyer submits a purchase request above the approval limit', async () => {});
        await test.step('Finance manager approves it', async () => {});
        await test.step('A purchase order is created from the approved request', async () => {});
      },
    );

    test(
      'a request above the approval limit cannot become an order without approval',
      {
        tag: tags(journey('requisition-approval'), TAG.BUYER, TAG.PURCHASE, TAG.SECURITY),
        annotation: requirement('P2P-011'),
      },
      async () => {
        scaffold();
      },
    );
  },
);

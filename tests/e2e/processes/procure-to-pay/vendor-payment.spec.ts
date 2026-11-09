import { test } from '@fixtures';
import { TAG, journey, tags } from '@config/tags';
import { requirement } from '@helpers/requirement';
import { scaffold } from '@helpers/scaffold';

test.describe('Procure to pay: vendor payment', { tag: tags(TAG.P2P, TAG.REGRESSION, TAG.P1) }, () => {
  test(
    'accountant part-pays a posted bill; the balance stays open',
    {
      tag: tags(journey('vendor-payment'), TAG.ACCOUNTANT, TAG.ACCOUNTING),
      annotation: requirement('P2P-030'),
    },
    async () => {
      scaffold();
      await test.step('Post a bill of 1,000', async () => {});
      await test.step('Register a payment of 400', async () => {});
      await test.step('Bill shows 600 outstanding and status partially paid', async () => {});
    },
  );
});

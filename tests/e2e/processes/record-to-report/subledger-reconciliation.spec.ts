import { test } from '@fixtures';
import { TAG, journey, tags } from '@config/tags';
import { requirement } from '@helpers/requirement';
import { scaffold } from '@helpers/scaffold';

test.describe(
  'Record to report: sub-ledger reconciliation',
  { tag: tags(TAG.R2R, TAG.REGRESSION, TAG.P1) },
  () => {
    test(
      'payables and receivables control accounts equal their sub-ledgers after P2P and O2C documents post',
      {
        tag: tags(
          journey('subledger-reconciliation'),
          TAG.ACCOUNTANT,
          TAG.ACCOUNTING,
          TAG.PURCHASE,
          TAG.SALES,
        ),
        annotation: requirement('R2R-020'),
      },
      async () => {
        scaffold();
      },
    );
  },
);

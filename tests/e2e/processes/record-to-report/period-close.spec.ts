import { test } from '@fixtures';
import { TAG, journey, tags } from '@config/tags';
import { requirement } from '@helpers/requirement';
import { scaffold } from '@helpers/scaffold';

test.describe(
  'Record to report: period close controls',
  { tag: tags(TAG.R2R, TAG.REGRESSION, TAG.P0) },
  () => {
    test(
      'a period with unposted documents cannot be closed',
      {
        tag: tags(journey('month-end-close'), TAG.FINANCE_MANAGER, TAG.ACCOUNTING),
        annotation: requirement('R2R-010'),
      },
      async () => {
        scaffold();
      },
    );

    test(
      'only a finance manager can reopen a closed period',
      {
        tag: tags(
          journey('month-end-close'),
          TAG.ACCOUNTANT,
          TAG.FINANCE_MANAGER,
          TAG.ACCOUNTING,
          TAG.SECURITY,
        ),
        annotation: requirement('R2R-011'),
      },
      async () => {
        scaffold();
      },
    );
  },
);

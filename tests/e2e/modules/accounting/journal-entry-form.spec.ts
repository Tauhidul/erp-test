import { test } from '@fixtures';
import { TAG, tags } from '@config/tags';
import { scaffold } from '@helpers/scaffold';
import { JournalEntryPage } from '@pages/accounting/journal-entry.page';

test.describe(
  'Accounting: journal entry screen',
  { tag: tags(TAG.ACCOUNTING, TAG.REGRESSION, TAG.ACCOUNTANT) },
  () => {
    test(
      'an unbalanced entry cannot be posted and the form says why',
      { tag: tags(TAG.P0) },
      async ({ as }) => {
        scaffold();
        const je = new JournalEntryPage(await as('accountant'));
        await je.openNew();
        await je.form.fill({ Debit: 1000, Credit: 900 });
        await je.form.save();
        await je.runAction('Post');
        await je.form.expectError(/must balance/i);
      },
    );
  },
);

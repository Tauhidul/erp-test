import { test, expect } from '@fixtures';
import { TAG, journey, tags } from '@config/tags';
import { journalEntryData } from '@data/factories/accounting.factory';
import { requirement } from '@helpers/requirement';
import { scaffold } from '@helpers/scaffold';
import { FiscalPeriodPage } from '@pages/accounting/fiscal-period.page';
import { JournalEntryPage } from '@pages/accounting/journal-entry.page';
import { TrialBalancePage } from '@pages/accounting/trial-balance.page';

test.describe('Record to report: happy path', { tag: tags(TAG.R2R, TAG.REGRESSION, TAG.P0) }, () => {
  test(
    'accountant posts a journal, finance manager checks the trial balance and closes the period',
    {
      tag: tags(journey('month-end-close'), TAG.ACCOUNTANT, TAG.FINANCE_MANAGER, TAG.ACCOUNTING),
      annotation: requirement('R2R-001'),
    },
    async ({ api, as }) => {
      scaffold();

      // Replace with accounts from the seeded chart of accounts
      const entry = await api.accounting.journalEntries.create(
        journalEntryData({ debitAccount: '1000-CASH', creditAccount: '4000-REVENUE', amount: 1000 }),
      );

      const journal = new JournalEntryPage(await as('accountant'));
      const report = new TrialBalancePage(await as('finance-manager'));
      const periods = new FiscalPeriodPage(await as('finance-manager'));

      await test.step('Accountant posts the journal entry', async () => {
        await journal.openByNumber(String(entry.number));
        await journal.post();
      });

      await test.step('Trial balance balances', async () => {
        await report.open();
        await report.expectBalanced();
        const tb = await api.accounting.trialBalance();
        expect(tb.totalDebit).toBe(tb.totalCredit);
      });

      await test.step('Finance manager closes the period', async () => {
        await periods.close('Test period');
      });

      await test.step('Posting into the closed period is rejected', async () => {
        const res = await api.accounting.journalEntries.createRaw(
          journalEntryData({ debitAccount: '1000-CASH', creditAccount: '4000-REVENUE' }),
        );
        expect(res.status()).toBe(422);
      });
    },
  );
});

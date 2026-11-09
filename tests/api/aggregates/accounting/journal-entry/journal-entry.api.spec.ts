import { test, expect } from '@fixtures';
import { TAG, tags } from '@config/tags';
import { journalEntryData } from '@data/factories/accounting.factory';
import { scaffold } from '@helpers/scaffold';

test.describe('JournalEntry aggregate', { tag: tags(TAG.API, TAG.ACCOUNTING) }, () => {
  test('rejects an unbalanced entry', { tag: tags(TAG.P0) }, async ({ api }) => {
    scaffold();
    const unbalanced = journalEntryData({
      debitAccount: '1000-CASH',
      creditAccount: '4000-REVENUE',
      amount: 1000,
    });
    unbalanced.lines[1]!.credit = 900;
    const res = await api.accounting.journalEntries.createRaw(unbalanced);
    expect(res.status()).toBe(422);
  });

  test('a posted entry cannot be edited, only reversed', { tag: tags(TAG.P0) }, async ({ api }) => {
    scaffold();
    const entry = await api.accounting.journalEntries.create(
      journalEntryData({ debitAccount: '1000-CASH', creditAccount: '4000-REVENUE' }),
    );
    await api.accounting.journalEntries.post(entry.id);
    const res = await api.accounting.journalEntries.actionRaw(entry.id, 'edit', { reference: 'changed' });
    expect(res.status()).toBe(409);
  });
});

import { uid } from '../unique';

/** A balanced two-line journal entry. Pass real account codes from the seeded chart of accounts. */
export const journalEntryData = (o: { debitAccount: string; creditAccount: string; amount?: number }) => ({
  reference: uid('JE'),
  lines: [
    { account: o.debitAccount, debit: o.amount ?? 1000, credit: 0 },
    { account: o.creditAccount, debit: 0, credit: o.amount ?? 1000 },
  ],
});

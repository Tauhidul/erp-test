import { expect } from '@playwright/test';
import { BasePage } from '../base.page';

export class TrialBalancePage extends BasePage {
  async open(): Promise<void> {
    await this.page.goto('/accounting/reports/trial-balance');
  }

  async expectBalanced(): Promise<void> {
    const debit = (await this.page.getByTestId('total-debit').textContent()) ?? '';
    const credit = (await this.page.getByTestId('total-credit').textContent()) ?? '';
    expect(debit.trim()).not.toBe('');
    expect(debit.trim()).toBe(credit.trim());
  }
}

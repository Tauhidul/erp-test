import { DocumentPage } from '../base.page';

export class PaymentPage extends DocumentPage {
  protected readonly route = '/accounting/payments';

  /** Register a payment (or receipt) against a posted bill/invoice. */
  async registerFor(documentNumber: string, amount: number): Promise<void> {
    await this.openNew();
    await this.form.choose('Applies to', documentNumber);
    await this.form.fill({ Amount: amount });
    await this.form.save();
    await this.runAction('Post');
    await this.expectStatus(/posted|paid/i);
  }
}

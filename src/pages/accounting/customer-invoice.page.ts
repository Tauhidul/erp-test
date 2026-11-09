import { DocumentPage } from '../base.page';

export class CustomerInvoicePage extends DocumentPage {
  protected readonly route = '/accounting/customer-invoices';

  async createFromSalesOrder(soNumber: string): Promise<string> {
    await this.openNew();
    await this.form.choose('Sales order', soNumber);
    await this.form.save();
    return this.documentNumber();
  }

  async post(): Promise<void> {
    await this.runAction('Post');
    await this.expectStatus(/posted/i);
  }
}

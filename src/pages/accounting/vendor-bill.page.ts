import { DocumentPage } from '../base.page';

export class VendorBillPage extends DocumentPage {
  protected readonly route = '/accounting/vendor-bills';

  async createFromPurchaseOrder(poNumber: string): Promise<string> {
    await this.openNew();
    await this.form.choose('Purchase order', poNumber);
    await this.form.save();
    return this.documentNumber();
  }

  async post(): Promise<void> {
    await this.runAction('Post');
    await this.expectStatus(/posted/i);
  }
}

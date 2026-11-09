import { DocumentPage } from '../base.page';

export class PurchaseOrderPage extends DocumentPage {
  protected readonly route = '/purchase/orders';

  /** Fill and save a new PO with one line. Returns the document number shown on screen. */
  async create(o: { vendor: string; product: string; qty: number; unitPrice: number }): Promise<string> {
    await this.openNew();
    await this.form.choose('Vendor', o.vendor);
    await this.form.choose('Product', o.product);
    await this.form.fill({ Quantity: o.qty, 'Unit price': o.unitPrice });
    await this.form.save();
    return this.documentNumber();
  }

  async confirm(): Promise<void> {
    await this.runAction('Confirm Order');
    await this.expectStatus(/confirmed/i);
  }
}

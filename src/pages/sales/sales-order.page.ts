import { DocumentPage } from '../base.page';

export class SalesOrderPage extends DocumentPage {
  protected readonly route = '/sales/orders';

  async create(o: {
    customer: string;
    product: string;
    qty: number;
    unitPrice: number;
    discountPct?: number;
  }): Promise<string> {
    await this.openNew();
    await this.form.choose('Customer', o.customer);
    await this.form.choose('Product', o.product);
    await this.form.fill({ Quantity: o.qty, 'Unit price': o.unitPrice, 'Discount %': o.discountPct ?? 0 });
    await this.form.save();
    return this.documentNumber();
  }

  async confirm(): Promise<void> {
    await this.runAction('Confirm Order');
    await this.expectStatus(/confirmed|sales order/i);
  }
}

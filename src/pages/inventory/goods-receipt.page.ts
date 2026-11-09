import { DocumentPage } from '../base.page';

export class GoodsReceiptPage extends DocumentPage {
  protected readonly route = '/inventory/receipts';

  async validate(): Promise<void> {
    await this.runAction('Validate');
    await this.expectStatus(/done|received/i);
  }
}

import { DocumentPage } from '../base.page';

export class DeliveryPage extends DocumentPage {
  protected readonly route = '/inventory/deliveries';

  async validate(): Promise<void> {
    await this.runAction('Validate');
    await this.expectStatus(/done|delivered/i);
  }
}

import { DocumentPage } from '../base.page';

export class FiscalPeriodPage extends DocumentPage {
  protected readonly route = '/accounting/fiscal-periods';

  async close(periodName: string): Promise<void> {
    await this.openByNumber(periodName);
    await this.runAction('Close Period');
    await this.expectStatus(/closed/i);
  }
}

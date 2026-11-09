import { DocumentPage } from '../base.page';

export class JournalEntryPage extends DocumentPage {
  protected readonly route = '/accounting/journal-entries';

  async post(): Promise<void> {
    await this.runAction('Post');
    await this.expectStatus(/posted/i);
  }
}

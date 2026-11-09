import { expect, type Page } from '@playwright/test';
import { SduiForm } from '@components/sdui/sdui-form';
import { SduiGrid } from '@components/sdui/sdui-grid';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async expectToast(text: string | RegExp): Promise<void> {
    await expect(this.page.getByRole('status').filter({ hasText: text })).toBeVisible();
  }
}

/**
 * A business document with a list, a form and a status flow
 * (draft → confirmed → posted ...). Most ERP screens are this shape.
 */
export abstract class DocumentPage extends BasePage {
  /** List route, e.g. '/purchase/orders'. */
  protected abstract readonly route: string;

  readonly form = new SduiForm(this.page.getByRole('main'));
  readonly grid = new SduiGrid(this.page.getByRole('main'));

  async openList(): Promise<void> {
    await this.page.goto(this.route);
  }

  async openNew(): Promise<void> {
    await this.page.goto(`${this.route}/new`);
  }

  async openByNumber(number: string): Promise<void> {
    await this.openList();
    await this.grid.open(number);
  }

  async runAction(name: string): Promise<void> {
    await this.page.getByRole('button', { name }).click();
  }

  async expectStatus(status: string | RegExp): Promise<void> {
    await expect(this.page.getByTestId('document-status')).toHaveText(status);
  }

  /** Document numbers change every run: read them from the screen, never hard-code them. */
  async documentNumber(): Promise<string> {
    return ((await this.page.getByTestId('document-number').textContent()) ?? '').trim();
  }
}

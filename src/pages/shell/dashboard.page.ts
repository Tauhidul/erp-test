import { expect } from '@playwright/test';
import { BasePage } from '../base.page';

export class DashboardPage extends BasePage {
  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByRole('main')).toBeVisible();
  }

  async expectMenuItem(name: string): Promise<void> {
    await expect(this.page.getByRole('navigation').getByRole('link', { name })).toBeVisible();
  }
}

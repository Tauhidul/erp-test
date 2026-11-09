import { expect, type Locator } from '@playwright/test';

/** The shared Hybrid-SDUI list/grid renderer. */
export class SduiGrid {
  constructor(private readonly root: Locator) {}

  row(text: string | RegExp): Locator {
    return this.root.getByRole('row').filter({ hasText: text });
  }

  async open(text: string | RegExp): Promise<void> {
    await this.row(text).first().click();
  }

  async expectRow(text: string | RegExp): Promise<void> {
    await expect(this.row(text).first()).toBeVisible();
  }
}

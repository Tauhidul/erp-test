import { expect, type Locator } from '@playwright/test';

/**
 * The shared Hybrid-SDUI form renderer. Every screen that uses it goes through here,
 * so a renderer change is fixed once, not in hundreds of tests.
 */
export class SduiForm {
  constructor(private readonly root: Locator) {}

  field(label: string): Locator {
    return this.root.getByLabel(label);
  }

  async fill(values: Record<string, string | number>): Promise<void> {
    for (const [label, value] of Object.entries(values)) {
      await this.field(label).fill(String(value));
    }
  }

  /** Pick an option in a lookup/select field. */
  async choose(label: string, option: string): Promise<void> {
    await this.field(label).click();
    await this.root.page().getByRole('option', { name: option }).click();
  }

  async save(): Promise<void> {
    await this.root.getByRole('button', { name: 'Save' }).click();
  }

  async expectError(text: string | RegExp): Promise<void> {
    await expect(this.root.getByRole('alert').filter({ hasText: text })).toBeVisible();
  }
}

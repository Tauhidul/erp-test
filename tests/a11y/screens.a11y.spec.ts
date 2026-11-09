import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@fixtures';
import type { Role } from '@config/roles';
import { TAG, tags } from '@config/tags';
import { scaffold } from '@helpers/scaffold';

// WCAG 2.1 AA (proposed target: confirm with the Product Owner). axe finds only part of all issues; keep manual checks.
const SCREENS: Array<{ name: string; role: Role; path: string }> = [
  { name: 'Purchase order form', role: 'buyer', path: '/purchase/orders/new' },
  { name: 'Sales order form', role: 'sales-rep', path: '/sales/orders/new' },
  { name: 'Goods receipt list', role: 'warehouse-clerk', path: '/inventory/receipts' },
  { name: 'Journal entry form', role: 'accountant', path: '/accounting/journal-entries/new' },
];

for (const { name, role, path } of SCREENS) {
  test(`${name} has no WCAG 2.1 AA violations`, { tag: tags(TAG.A11Y, TAG.P1) }, async ({ as }) => {
    scaffold();
    const page = await as(role);
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}

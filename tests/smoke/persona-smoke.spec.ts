import { test } from '@fixtures';
import type { Role } from '@config/roles';
import { TAG, tags, type Tag } from '@config/tags';
import { DashboardPage } from '@pages/shell/dashboard.page';

/** Fast guard for every deploy: each persona can sign in and sees the apps they own. Keep under 5 minutes. */
const PERSONAS: Array<{ role: Role; tag: Tag; menu: string }> = [
  { role: 'sales-rep', tag: TAG.SALES_REP, menu: 'Sales' },
  { role: 'buyer', tag: TAG.BUYER, menu: 'Purchase' },
  { role: 'warehouse-clerk', tag: TAG.WAREHOUSE_CLERK, menu: 'Inventory' },
  { role: 'accountant', tag: TAG.ACCOUNTANT, menu: 'Accounting' },
];

for (const { role, tag, menu } of PERSONAS) {
  test(
    `${role} can open the dashboard and sees the ${menu} app`,
    { tag: tags(TAG.SMOKE, TAG.P0, tag) },
    async ({ as }) => {
      const dashboard = new DashboardPage(await as(role));
      await dashboard.open();
      await dashboard.expectLoaded();
      await dashboard.expectMenuItem(menu);
    },
  );
}

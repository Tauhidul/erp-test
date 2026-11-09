import { test } from '@fixtures';
import { TAG, tags } from '@config/tags';
import { scaffold } from '@helpers/scaffold';
import { StockAdjustmentPage } from '@pages/inventory/stock-adjustment.page';

test.describe(
  'Inventory: stock adjustment screen',
  { tag: tags(TAG.INVENTORY, TAG.REGRESSION, TAG.WAREHOUSE_CLERK) },
  () => {
    test('list shows a newly created adjustment', { tag: tags(TAG.P2) }, async ({ api, as }) => {
      scaffold();
      const page = new StockAdjustmentPage(await as('warehouse-clerk'));
      const adjustment = await api.inventory.adjustments.create({}); // use stockAdjustmentData() once ids are known
      await page.openList();
      await page.grid.expectRow(String(adjustment.number));
    });
  },
);

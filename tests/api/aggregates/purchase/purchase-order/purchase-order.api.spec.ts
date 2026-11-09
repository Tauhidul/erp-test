import { test, expect } from '@fixtures';
import { TAG, tags } from '@config/tags';
import { productData } from '@data/factories/inventory.factory';
import { purchaseOrderData, vendorData } from '@data/factories/purchase.factory';
import { scaffold } from '@helpers/scaffold';

// Aggregate: PurchaseOrder. Rules are proven here in milliseconds, not in the browser.
test.describe('PurchaseOrder aggregate', { tag: tags(TAG.API, TAG.PURCHASE) }, () => {
  test('rejects an order without a vendor', { tag: tags(TAG.P1) }, async ({ api }) => {
    scaffold();
    const res = await api.purchase.orders.createRaw({ lines: [] });
    expect(res.status()).toBe(422);
    expect(await res.json()).toMatchObject({ errors: { vendorId: expect.any(Array) } });
  });

  test(
    'a buyer cannot approve their own order',
    { tag: tags(TAG.P0, TAG.SECURITY) },
    async ({ api, apiAs }) => {
      scaffold();
      const vendor = await api.purchase.vendors.create(vendorData());
      const product = await api.inventory.products.create(productData());
      const order = await api.purchase.orders.create(
        purchaseOrderData({ vendorId: vendor.id, productId: product.id }),
      );

      const buyer = await apiAs('buyer');
      const res = await buyer.purchase.orders.actionRaw(order.id, 'approve');
      expect(res.status()).toBe(403);
    },
  );
});

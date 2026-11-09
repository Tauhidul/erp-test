import { test, expect } from '@fixtures';
import { TAG, tags } from '@config/tags';
import { productData } from '@data/factories/inventory.factory';
import { customerData, salesOrderData } from '@data/factories/sales.factory';
import { scaffold } from '@helpers/scaffold';

test.describe('SalesOrder aggregate', { tag: tags(TAG.API, TAG.SALES) }, () => {
  test('rejects a discount above the sales rep limit', { tag: tags(TAG.P0) }, async ({ api, apiAs }) => {
    scaffold();
    const customer = await api.sales.customers.create(customerData());
    const product = await api.inventory.products.create(productData({ openingStock: 10 }));

    const rep = await apiAs('sales-rep');
    const res = await rep.sales.orders.createRaw(
      salesOrderData({ customerId: customer.id, productId: product.id, discountPct: 90 }),
    );
    expect(res.status()).toBe(422);
  });

  test('line total applies discount before VAT', { tag: tags(TAG.P0) }, async ({ api }) => {
    scaffold();
    const customer = await api.sales.customers.create(customerData());
    const product = await api.inventory.products.create(productData({ openingStock: 20 }));
    // 10 units x 1,000, 10% discount, 15% VAT → 10,350
    const order = await api.sales.orders.create(
      salesOrderData({
        customerId: customer.id,
        productId: product.id,
        qty: 10,
        unitPrice: 1000,
        discountPct: 10,
      }),
    );
    expect(order.total).toBe(10350);
  });
});

import { test, expect } from '@fixtures';
import { TAG, tags } from '@config/tags';
import { productData } from '@data/factories/inventory.factory';
import { scaffold } from '@helpers/scaffold';

test.describe('StockMove aggregate', { tag: tags(TAG.API, TAG.INVENTORY) }, () => {
  test('cannot reserve more than is available', { tag: tags(TAG.P0) }, async ({ api }) => {
    scaffold();
    const product = await api.inventory.products.create(productData({ openingStock: 3 }));
    const res = await api.inventory.stockMoves.createRaw({
      productId: product.id,
      quantity: 5,
      type: 'reserve',
    });
    expect(res.status()).toBe(422);
    expect(await api.inventory.onHand(String(product.sku))).toBe(3);
  });
});

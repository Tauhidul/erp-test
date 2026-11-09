import { uid } from '../unique';

export const productData = (o: { openingStock?: number } = {}) => ({
  sku: uid('SKU'),
  name: uid('PRODUCT'),
  tracked: true,
  openingStock: o.openingStock ?? 0,
});

export const stockAdjustmentData = (o: { productId: string; warehouseId: string; delta: number }) => ({
  productId: o.productId,
  warehouseId: o.warehouseId,
  quantityDelta: o.delta,
  reason: 'Automated test adjustment',
});

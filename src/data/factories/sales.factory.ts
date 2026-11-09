import { uid } from '../unique';

export const customerData = (o: { creditLimit?: number } = {}) => ({
  name: uid('CUSTOMER'),
  creditLimit: o.creditLimit ?? 1_000_000,
});

export const salesOrderData = (o: {
  customerId: string;
  productId: string;
  qty?: number;
  unitPrice?: number;
  discountPct?: number;
}) => ({
  customerId: o.customerId,
  lines: [
    {
      productId: o.productId,
      quantity: o.qty ?? 5,
      unitPrice: o.unitPrice ?? 200,
      discountPct: o.discountPct ?? 0,
    },
  ],
});

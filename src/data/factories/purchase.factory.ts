import { uid } from '../unique';

export const vendorData = () => ({ name: uid('VENDOR'), paymentTermsDays: 30 });

export const purchaseOrderData = (o: {
  vendorId: string;
  productId: string;
  qty?: number;
  unitPrice?: number;
}) => ({
  vendorId: o.vendorId,
  lines: [{ productId: o.productId, quantity: o.qty ?? 10, unitPrice: o.unitPrice ?? 100 }],
});

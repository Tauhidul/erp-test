import { test, expect } from '@fixtures';
import { TAG, journey, tags } from '@config/tags';
import { productData } from '@data/factories/inventory.factory';
import { vendorData } from '@data/factories/purchase.factory';
import { requirement } from '@helpers/requirement';
import { scaffold } from '@helpers/scaffold';
import { VendorBillPage } from '@pages/accounting/vendor-bill.page';
import { PaymentPage } from '@pages/accounting/payment.page';
import { GoodsReceiptPage } from '@pages/inventory/goods-receipt.page';
import { PurchaseOrderPage } from '@pages/purchase/purchase-order.page';

test.describe('Procure to pay: happy path', { tag: tags(TAG.P2P, TAG.REGRESSION, TAG.P0) }, () => {
  test(
    'buyer orders, warehouse receives, accountant bills and pays; stock and ledger agree',
    {
      tag: tags(
        journey('full-cycle'),
        TAG.BUYER,
        TAG.WAREHOUSE_CLERK,
        TAG.ACCOUNTANT,
        TAG.PURCHASE,
        TAG.INVENTORY,
        TAG.ACCOUNTING,
      ),
      annotation: requirement('P2P-001'),
    },
    async ({ api, as }) => {
      scaffold();

      // Arrange through the API: fast, and failures here are not "the test under test"
      const vendor = await api.purchase.vendors.create(vendorData());
      const product = await api.inventory.products.create(productData());

      const buyer = new PurchaseOrderPage(await as('buyer'));
      const warehouse = new GoodsReceiptPage(await as('warehouse-clerk'));
      const accountant = {
        bill: new VendorBillPage(await as('accountant')),
        payment: new PaymentPage(await as('accountant')),
      };

      let poNumber = '';
      let billNumber = '';

      await test.step('Buyer creates and confirms the purchase order', async () => {
        poNumber = await buyer.create({
          vendor: String(vendor.name),
          product: String(product.sku),
          qty: 10,
          unitPrice: 100,
        });
        await buyer.confirm();
      });

      await test.step('Warehouse receives the goods', async () => {
        const receipt = await api.inventory.receipts.forSource(poNumber);
        await warehouse.openByNumber(String(receipt.number));
        await warehouse.validate();
      });

      await test.step('Accountant records and posts the vendor bill', async () => {
        billNumber = await accountant.bill.createFromPurchaseOrder(poNumber);
        await accountant.bill.post();
      });

      await test.step('Accountant pays the bill', async () => {
        await accountant.payment.registerFor(billNumber, 10 * 100);
      });

      await test.step('Stock and ledger agree', async () => {
        expect(await api.inventory.onHand(String(product.sku))).toBe(10);
        const bill = await api.accounting.vendorBills.get(billNumber);
        const entry = await api.accounting.journalEntries.forSource('vendor-bill', bill.id);
        const debit = entry.lines.reduce((sum, l) => sum + l.debit, 0);
        const credit = entry.lines.reduce((sum, l) => sum + l.credit, 0);
        expect(debit).toBe(credit);
      });
    },
  );
});

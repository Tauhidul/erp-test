import { test, expect } from '@fixtures';
import { TAG, journey, tags } from '@config/tags';
import { productData } from '@data/factories/inventory.factory';
import { customerData } from '@data/factories/sales.factory';
import { requirement } from '@helpers/requirement';
import { scaffold } from '@helpers/scaffold';
import { CustomerInvoicePage } from '@pages/accounting/customer-invoice.page';
import { PaymentPage } from '@pages/accounting/payment.page';
import { DeliveryPage } from '@pages/inventory/delivery.page';
import { SalesOrderPage } from '@pages/sales/sales-order.page';

test.describe('Order to cash: happy path', { tag: tags(TAG.O2C, TAG.REGRESSION, TAG.P0) }, () => {
  test(
    'sales rep sells, warehouse delivers, accountant invoices and collects; stock and ledger agree',
    {
      tag: tags(
        journey('full-cycle'),
        TAG.SALES_REP,
        TAG.WAREHOUSE_CLERK,
        TAG.ACCOUNTANT,
        TAG.SALES,
        TAG.INVENTORY,
        TAG.ACCOUNTING,
      ),
      annotation: requirement('O2C-001'),
    },
    async ({ api, as }) => {
      scaffold();

      const customer = await api.sales.customers.create(customerData());
      const product = await api.inventory.products.create(productData({ openingStock: 50 }));

      const sales = new SalesOrderPage(await as('sales-rep'));
      const warehouse = new DeliveryPage(await as('warehouse-clerk'));
      const invoices = new CustomerInvoicePage(await as('accountant'));
      const payments = new PaymentPage(await as('accountant'));

      let soNumber = '';
      let invoiceNumber = '';

      await test.step('Sales rep creates and confirms the order', async () => {
        soNumber = await sales.create({
          customer: String(customer.name),
          product: String(product.sku),
          qty: 2,
          unitPrice: 500,
        });
        await sales.confirm();
      });

      await test.step('Warehouse delivers the goods', async () => {
        const delivery = await api.inventory.deliveries.forSource(soNumber);
        await warehouse.openByNumber(String(delivery.number));
        await warehouse.validate();
      });

      await test.step('Accountant posts the invoice', async () => {
        invoiceNumber = await invoices.createFromSalesOrder(soNumber);
        await invoices.post();
      });

      await test.step('Accountant records the customer payment', async () => {
        await payments.registerFor(invoiceNumber, 2 * 500);
      });

      await test.step('Stock and ledger agree', async () => {
        expect(await api.inventory.onHand(String(product.sku))).toBe(48);
        const invoice = await api.accounting.customerInvoices.get(invoiceNumber);
        const entry = await api.accounting.journalEntries.forSource('customer-invoice', invoice.id);
        const debit = entry.lines.reduce((sum, l) => sum + l.debit, 0);
        const credit = entry.lines.reduce((sum, l) => sum + l.credit, 0);
        expect(debit).toBe(credit);
      });
    },
  );
});

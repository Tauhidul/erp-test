import type { APIRequestContext } from '@playwright/test';
import { ResourceApi, ok, type Entity } from './base';

class StockDocuments extends ResourceApi {
  validate(id: string): Promise<Entity> {
    return this.action(id, 'validate');
  }
  /** Find the document created from a purchase/sales order. */
  async forSource(sourceNumber: string): Promise<Entity> {
    const [doc] = await this.list({ source: sourceNumber });
    if (!doc) throw new Error(`No ${this.resource} found for source ${sourceNumber}`);
    return doc;
  }
}

/** Inventory app: products, warehouses, receipts (goods in), deliveries (goods out), stock moves. */
export class InventoryApi {
  readonly products: ResourceApi;
  readonly warehouses: ResourceApi;
  readonly receipts: StockDocuments;
  readonly deliveries: StockDocuments;
  readonly stockMoves: ResourceApi;
  readonly adjustments: ResourceApi;

  constructor(private readonly http: APIRequestContext) {
    this.products = new ResourceApi(http, 'products');
    this.warehouses = new ResourceApi(http, 'warehouses');
    this.receipts = new StockDocuments(http, 'goods-receipts');
    this.deliveries = new StockDocuments(http, 'deliveries');
    this.stockMoves = new ResourceApi(http, 'stock-moves');
    this.adjustments = new ResourceApi(http, 'stock-adjustments');
  }

  /** Quantity on hand for a SKU, across all warehouses. */
  async onHand(sku: string): Promise<number> {
    const body = await this.http
      .get('stock/on-hand', { params: { sku } })
      .then((r) => ok<{ quantity: number }>(r));
    return body.quantity;
  }
}

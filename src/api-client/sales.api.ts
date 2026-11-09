import type { APIRequestContext } from '@playwright/test';
import { ResourceApi, type Entity } from './base';

class SalesOrders extends ResourceApi {
  confirm(id: string): Promise<Entity> {
    return this.action(id, 'confirm');
  }
  approve(id: string): Promise<Entity> {
    return this.action(id, 'approve');
  }
}

/** Sales app: customers, quotations, sales orders. */
export class SalesApi {
  readonly customers: ResourceApi;
  readonly quotations: ResourceApi;
  readonly orders: SalesOrders;

  constructor(http: APIRequestContext) {
    this.customers = new ResourceApi(http, 'customers');
    this.quotations = new ResourceApi(http, 'quotations');
    this.orders = new SalesOrders(http, 'sales-orders');
  }
}

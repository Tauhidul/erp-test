import type { APIRequestContext } from '@playwright/test';
import { ResourceApi, type Entity } from './base';

class PurchaseOrders extends ResourceApi {
  confirm(id: string): Promise<Entity> {
    return this.action(id, 'confirm');
  }
  approve(id: string): Promise<Entity> {
    return this.action(id, 'approve');
  }
}

/** Purchase app: vendors, purchase requests, purchase orders. */
export class PurchaseApi {
  readonly vendors: ResourceApi;
  readonly requests: ResourceApi;
  readonly orders: PurchaseOrders;

  constructor(http: APIRequestContext) {
    this.vendors = new ResourceApi(http, 'vendors');
    this.requests = new ResourceApi(http, 'purchase-requests');
    this.orders = new PurchaseOrders(http, 'purchase-orders');
  }
}

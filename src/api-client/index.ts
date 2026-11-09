import type { APIRequestContext, PlaywrightWorkerArgs } from '@playwright/test';
import { env } from '@config/env';
import { storageStatePath, type Role } from '@config/roles';
import { AccountingApi } from './accounting.api';
import { InventoryApi } from './inventory.api';
import { PurchaseApi } from './purchase.api';
import { SalesApi } from './sales.api';

export * from './base';
export type { JournalEntry, JournalLine } from './accounting.api';

/**
 * Typed entry point to the Mukut API, one property per app.
 * It reuses the browser session saved by the `setup` project. If the API uses bearer tokens
 * instead of cookies, change `create()` only: no test needs to change.
 */
export class ApiClient {
  readonly purchase: PurchaseApi;
  readonly sales: SalesApi;
  readonly inventory: InventoryApi;
  readonly accounting: AccountingApi;

  private constructor(private readonly http: APIRequestContext) {
    this.purchase = new PurchaseApi(http);
    this.sales = new SalesApi(http);
    this.inventory = new InventoryApi(http);
    this.accounting = new AccountingApi(http);
  }

  static async create(
    playwright: PlaywrightWorkerArgs['playwright'],
    role: Role = 'admin',
  ): Promise<ApiClient> {
    const http = await playwright.request.newContext({
      baseURL: env.apiURL,
      storageState: storageStatePath(role),
      extraHTTPHeaders: { Accept: 'application/json' },
    });
    return new ApiClient(http);
  }

  dispose(): Promise<void> {
    return this.http.dispose();
  }
}

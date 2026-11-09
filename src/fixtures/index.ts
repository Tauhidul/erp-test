import { test as base, expect, type BrowserContext, type Page } from '@playwright/test';
import { ApiClient } from '@api-client';
import { env } from '@config/env';
import { storageStatePath, type Role } from '@config/roles';

interface TestFixtures {
  /** Open a page already logged in as `role`. A journey can use several roles side by side. */
  as: (role: Role) => Promise<Page>;
  /** API client acting as `role` (for permission tests). */
  apiAs: (role: Role) => Promise<ApiClient>;
}

interface WorkerFixtures {
  /** API client acting as admin: use it to create test data and to verify results. */
  api: ApiClient;
}

export const test = base.extend<TestFixtures, WorkerFixtures>({
  as: async ({ browser }, use) => {
    const contexts: BrowserContext[] = [];
    await use(async (role) => {
      const context = await browser.newContext({
        baseURL: env.baseURL,
        storageState: storageStatePath(role),
      });
      contexts.push(context);
      return context.newPage();
    });
    await Promise.all(contexts.map((c) => c.close()));
  },

  apiAs: async ({ playwright }, use) => {
    const clients: ApiClient[] = [];
    await use(async (role) => {
      const client = await ApiClient.create(playwright, role);
      clients.push(client);
      return client;
    });
    await Promise.all(clients.map((c) => c.dispose()));
  },

  api: [
    async ({ playwright }, use) => {
      const client = await ApiClient.create(playwright, 'admin');
      await use(client);
      await client.dispose();
    },
    { scope: 'worker' },
  ],
});

export { expect };

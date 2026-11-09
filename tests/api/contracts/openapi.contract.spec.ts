import { test, expect } from '@fixtures';
import { env } from '@config/env';
import { TAG, tags } from '@config/tags';
import { scaffold } from '@helpers/scaffold';

// Contract checks guard the API surface that the SDUI screens and these tests depend on.
test.describe('API contract', { tag: tags(TAG.API, TAG.CONTRACT) }, () => {
  test(
    'OpenAPI document lists every resource the suite uses',
    { tag: tags(TAG.P1) },
    async ({ playwright }) => {
      scaffold('Scaffold: point at the real OpenAPI URL, then remove this line');
      const http = await playwright.request.newContext({ baseURL: env.apiURL });
      const res = await http.get('openapi.json');
      expect(res.ok()).toBe(true);
      const spec = (await res.json()) as { paths: Record<string, unknown> };
      for (const path of [
        '/vendors',
        '/purchase-orders',
        '/sales-orders',
        '/goods-receipts',
        '/journal-entries',
      ]) {
        expect(Object.keys(spec.paths)).toContain(path);
      }
      await http.dispose();
    },
  );
});

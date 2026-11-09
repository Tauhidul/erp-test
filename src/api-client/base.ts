import type { APIRequestContext, APIResponse } from '@playwright/test';

/** Minimal shape shared by every ERP document/record. Narrow it per aggregate when the real API is known. */
export interface Entity {
  id: string;
  number?: string;
  status?: string;
  [key: string]: unknown;
}

/** Parse a successful response or throw with enough detail to debug from a CI log. */
export async function ok<T = Entity>(res: APIResponse): Promise<T> {
  if (!res.ok()) {
    throw new Error(`${res.url()} → ${res.status()} ${res.statusText()}: ${await res.text()}`);
  }
  return (await res.json()) as T;
}

/**
 * One REST resource (e.g. "purchase-orders"). Checked methods return the entity or throw.
 * *Raw methods return the response untouched, for negative tests (422, 403 ...).
 */
export class ResourceApi {
  constructor(
    protected readonly http: APIRequestContext,
    protected readonly resource: string,
  ) {}

  create(data: object): Promise<Entity> {
    return this.createRaw(data).then((r) => ok(r));
  }
  createRaw(data: object): Promise<APIResponse> {
    return this.http.post(this.resource, { data });
  }
  get(id: string): Promise<Entity> {
    return this.http.get(`${this.resource}/${id}`).then((r) => ok(r));
  }
  list(params: Record<string, string | number> = {}): Promise<Entity[]> {
    return this.http.get(this.resource, { params }).then((r) => ok<Entity[]>(r));
  }
  /** POST {resource}/{id}/{action}, e.g. purchase-orders/42/confirm */
  action(id: string, name: string, data?: object): Promise<Entity> {
    return this.actionRaw(id, name, data).then((r) => ok(r));
  }
  actionRaw(id: string, name: string, data?: object): Promise<APIResponse> {
    return this.http.post(`${this.resource}/${id}/${name}`, { data });
  }
}

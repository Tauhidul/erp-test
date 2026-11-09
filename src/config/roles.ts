import path from 'node:path';

/** Personas. The names double as persona tags (`@accountant`) and as env-var prefixes. */
export const ROLES = [
  'sales-rep',
  'buyer',
  'warehouse-clerk',
  'accountant',
  'finance-manager',
  'admin',
] as const;

export type Role = (typeof ROLES)[number];

export const storageStatePath = (role: Role): string => path.resolve(process.cwd(), '.auth', `${role}.json`);

export interface Credentials {
  username: string;
  password: string;
}

/** `warehouse-clerk` reads MUKUT_WAREHOUSE_CLERK_USER / _PASSWORD. Returns undefined when not configured. */
export function credentialsFor(role: Role): Credentials | undefined {
  const prefix = `MUKUT_${role.toUpperCase().replace(/-/g, '_')}`;
  const username = process.env[`${prefix}_USER`];
  const password = process.env[`${prefix}_PASSWORD`];
  return username && password ? { username, password } : undefined;
}

/**
 * Single source of truth for tags. Never type a tag as a bare string in a spec.
 *
 * Folders say WHERE a test lives. Tags say HOW to select it:
 *   process  → which business process it belongs to
 *   module   → which app(s) it touches
 *   persona  → which user role performs it
 *   journey  → which named user journey inside the process (see docs/JOURNEYS.md)
 *   priority → P0 money/stock/security, P1 core flows, P2 edge cases
 *   suite    → what kind of check it is
 */
export const TAG = {
  // Business process
  P2P: '@p2p',
  O2C: '@o2c',
  R2R: '@r2r',

  // Apps / modules
  PURCHASE: '@purchase',
  SALES: '@sales',
  INVENTORY: '@inventory',
  ACCOUNTING: '@accounting',

  // Personas (match src/config/roles.ts)
  SALES_REP: '@sales-rep',
  BUYER: '@buyer',
  WAREHOUSE_CLERK: '@warehouse-clerk',
  ACCOUNTANT: '@accountant',
  FINANCE_MANAGER: '@finance-manager',
  ADMIN: '@admin',

  // Priority
  P0: '@P0',
  P1: '@P1',
  P2: '@P2',

  // Suite type
  SMOKE: '@smoke',
  REGRESSION: '@regression',
  API: '@api',
  CONTRACT: '@contract',
  SECURITY: '@security',
  A11Y: '@a11y',
  VISUAL: '@visual',
} as const;

export type Tag = (typeof TAG)[keyof typeof TAG];
export type JourneyTag = `@journey-${string}`;

/** Build a journey tag: journey('three-way-match') → '@journey-three-way-match' */
export const journey = (name: string): JourneyTag => `@journey-${name}`;

/** Typed helper so a typo in a tag fails at compile time. */
export const tags = (...list: Array<Tag | JourneyTag>): string[] => list;

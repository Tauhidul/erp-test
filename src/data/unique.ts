/** Unique, readable suffix so parallel tests never collide on names, SKUs or references. */
export const uid = (prefix: string): string =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`.toUpperCase();

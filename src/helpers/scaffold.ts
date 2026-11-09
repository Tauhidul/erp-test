import { test } from '@playwright/test';

/**
 * Call at the top of a test whose locators or endpoints have not yet been wired to the live Mukut build.
 * The test is reported as "fixme" (visible in the report) instead of failing or silently passing.
 * Delete the call when the test is wired up. `grep -r "scaffold()" tests` lists what is left.
 */
export function scaffold(note = 'Scaffold: wire locators/endpoints to the live Mukut build'): void {
  test.fixme(true, note);
}

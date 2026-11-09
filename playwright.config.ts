import { defineConfig, devices, type PlaywrightTestProject } from '@playwright/test';
import { env } from './src/config/env';

/**
 * One project per "slice" of the suite, so each slice runs on its own:
 *   npx playwright test --project=p2p
 * Finer slices (module, persona, journey, priority) use tags:
 *   npx playwright test --grep "@accountant"
 * See README.md for the full list of commands.
 */

const desktopChrome = { ...devices['Desktop Chrome'] };

/** A browser project that logs in first (via the `setup` project) and then runs one folder of tests. */
const uiProject = (
  name: string,
  testDir: string,
  extra: Partial<PlaywrightTestProject> = {},
): PlaywrightTestProject => ({
  name,
  testDir,
  dependencies: ['setup'],
  use: desktopChrome,
  ...extra,
});

export default defineConfig({
  testDir: './tests',
  outputDir: 'reports/test-results',
  fullyParallel: true,
  forbidOnly: env.ci,
  retries: env.ci ? 1 : 0, // at most one retry, and it is always reported as flaky
  workers: env.ci ? 4 : undefined,
  timeout: 60_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.01 },
  },
  reporter: env.ci
    ? [
        ['github'],
        ['html', { open: 'never', outputFolder: 'reports/html' }],
        ['junit', { outputFile: 'reports/junit.xml' }],
      ]
    : [['list'], ['html', { open: 'never', outputFolder: 'reports/html' }]],
  use: {
    baseURL: env.baseURL,
    testIdAttribute: 'data-testid',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    locale: 'en-US',
    timezoneId: 'Asia/Dhaka',
  },
  projects: [
    // Logs in once per role and saves .auth/<role>.json
    { name: 'setup', testDir: './tests/setup', testMatch: /.*\.setup\.ts/ },

    // Business processes (primary axis for end-to-end journeys)
    uiProject('p2p', './tests/e2e/processes/procure-to-pay'),
    uiProject('o2c', './tests/e2e/processes/order-to-cash'),
    uiProject('r2r', './tests/e2e/processes/record-to-report'),

    // Screen regression per app/module
    uiProject('modules', './tests/e2e/modules'),

    // Fast persona journeys that guard every deploy
    uiProject('smoke', './tests/smoke'),
    uiProject('smoke-firefox', './tests/smoke', { use: { ...devices['Desktop Firefox'] }, grep: /@smoke/ }),
    uiProject('smoke-webkit', './tests/smoke', { use: { ...devices['Desktop Safari'] }, grep: /@smoke/ }),

    // Aggregate rules and contracts: no browser rendering, so fast
    { name: 'api', testDir: './tests/api', dependencies: ['setup'] },

    // Non-functional checks that Playwright can do
    uiProject('a11y', './tests/a11y'),
    uiProject('visual', './tests/visual', {
      use: { ...desktopChrome, viewport: { width: 1440, height: 900 } },
    }),
  ],
});

# Mukut ERP: Playwright test suite

Automated tests for the Mukut ERP apps (**Purchase, Sales, Inventory, Accounting**), organised around the three
business processes (**Procure to Pay, Order to Cash, Record to Report, Order To Delivery , PO To Receive**).

The design follows the Mukut testing briefing: few end-to-end tests that follow money and stock across modules,
many fast tests underneath, and every test creates its own data.

## How the suite is organised

One **primary axis per layer**. Everything else is a **tag**, so any slice can run on demand.

| Layer               | Primary axis               | Folder                                    |
| ------------------- | -------------------------- | ----------------------------------------- |
| End-to-end journeys | **Business process**       | `tests/e2e/processes/<process>/`          |
| Screen regression   | **App / module**           | `tests/e2e/modules/<app>/`                |
| Business rules      | **Aggregate** (no browser) | `tests/api/aggregates/<app>/<aggregate>/` |
| Contracts           | API surface                | `tests/api/contracts/`                    |
| Deploy guard        | **User journey / persona** | `tests/smoke/`                            |
| Non-functional      | Check type                 | `tests/a11y/`, `tests/visual/`            |

**User journeys live inside their process as tags.** Procure to pay is one folder; inside it each journey is a
file and carries a `@journey-*` tag:

```
tests/e2e/processes/procure-to-pay/
├─ happy-path.spec.ts              @journey-full-cycle
├─ requisition-approval.spec.ts    @journey-requisition-approval
├─ three-way-match.spec.ts         @journey-three-way-match
└─ vendor-payment.spec.ts          @journey-vendor-payment
```

The full journey list is in [docs/JOURNEYS.md](docs/JOURNEYS.md).

## Directory structure

```
mukut-erp-tests/
├─ playwright.config.ts          projects = slices of the suite (p2p, o2c, r2r, modules, smoke, api, a11y, visual)
├─ src/                          reusable code, no test cases here
│  ├─ config/                    env, roles (personas), TAGS (single source of truth)
│  ├─ fixtures/                  `test` with `as(role)`, `apiAs(role)`, `api`
│  ├─ api-client/                typed client per app: purchase, sales, inventory, accounting
│  ├─ pages/                     page objects per app (purchase/ sales/ inventory/ accounting/ auth/ shell/)
│  ├─ components/sdui/           shared Hybrid-SDUI form and grid helpers
│  ├─ data/                      unique-data helper + factories per app
│  └─ helpers/                   scaffold(), requirement()
├─ tests/
│  ├─ setup/                     logs in once per role → .auth/<role>.json
│  ├─ e2e/
│  │  ├─ processes/              procure-to-pay/  order-to-cash/  record-to-report/
│  │  └─ modules/                purchase/  sales/  inventory/  accounting/
│  ├─ smoke/                     persona journeys tagged @smoke
│  ├─ api/
│  │  ├─ aggregates/             <app>/<aggregate>/*.api.spec.ts
│  │  └─ contracts/              OpenAPI / screen-definition checks
│  ├─ a11y/                      axe scans (WCAG 2.1 AA)
│  └─ visual/                    screenshot comparison of key screens
├─ docs/                         CONVENTIONS.md, JOURNEYS.md
└─ .github/workflows/            PR run (smoke, api, P0) and nightly full run
```

## Where does a new test go?

1. Needs no browser? → `tests/api/aggregates/<app>/<aggregate>/`
2. Follows a process across modules? → `tests/e2e/processes/<process>/`, add a `@journey-*` tag
3. Checks one screen? → `tests/e2e/modules/<app>/`
4. Must run on every deploy and is fast? → add `@smoke` plus the persona tag

## Tags

Defined once in [src/config/tags.ts](src/config/tags.ts). Never type a tag as a bare string.

| Group    | Tags                                                                               |
| -------- | ---------------------------------------------------------------------------------- |
| Process  | `@p2p` `@o2c` `@r2r`                                                               |
| Module   | `@purchase` `@sales` `@inventory` `@accounting`                                    |
| Persona  | `@sales-rep` `@buyer` `@warehouse-clerk` `@accountant` `@finance-manager` `@admin` |
| Journey  | `@journey-<name>` (for example `@journey-three-way-match`)                         |
| Priority | `@P0` money, stock, security · `@P1` core flows · `@P2` edge cases                 |
| Suite    | `@smoke` `@regression` `@api` `@contract` `@security` `@a11y` `@visual`            |

```ts
test('...', { tag: tags(journey('three-way-match'), TAG.WAREHOUSE_CLERK, TAG.ACCOUNTANT), annotation: requirement('P2P-020') }, ...)
```

## Running

```bash
npm install
npx playwright install chromium
cp .env.example .env            # then fill in the test URL and one test user per role
```

| Goal                    | Command                                                    |
| ----------------------- | ---------------------------------------------------------- |
| Whole suite             | `npm test`                                                 |
| One process             | `npm run test:p2p` · `test:o2c` · `test:r2r`               |
| One module's screens    | `npm run test:modules -- --grep @purchase`                 |
| One journey             | `npx playwright test --grep @journey-three-way-match`      |
| One persona             | `npx playwright test --grep @accountant`                   |
| Process **and** persona | `npx playwright test --grep "(?=.*@p2p)(?=.*@accountant)"` |
| Everything critical     | `npm run test:p0`                                          |
| Deploy guard            | `npm run test:smoke`                                       |
| Aggregate rules         | `npm run test:api`                                         |
| List without running    | `npm run test:list`                                        |
| Open last report        | `npm run report`                                           |

## Status of the tests in this scaffold

The structure, tooling, fixtures, typed API client and page objects are complete. **The locators, endpoint paths and
field names are placeholders** because they have not been checked against a live Mukut build. Tests that depend on
them call `scaffold()` and show as **fixme** in the report instead of failing. To wire one up:

1. Fix the page object / API client it uses so it matches the real screen or endpoint.
2. Delete the `scaffold()` line in the test.
3. Run it. Find what is left with `grep -rn "scaffold()" tests`.

Wire these first, in order: `tests/setup` → `tests/smoke` → one `happy-path.spec.ts` → the aggregate API tests.

See [docs/CONVENTIONS.md](docs/CONVENTIONS.md) for the rules every test must follow.

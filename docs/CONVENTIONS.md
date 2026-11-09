# Conventions

Rules that keep the suite maintainable as Mukut grows. They follow Playwright's own guidance and the Mukut testing
briefing.

## Layering

- `tests/` holds test cases only. Anything reused goes in `src/`.
- Specs never call `page.locator('css…')` for app screens. They use page objects (`src/pages`) and SDUI components
  (`src/components/sdui`). A renderer or screen change is then fixed once.
- Dependencies point one way: `tests → fixtures → pages / api-client / data → config`.
- Imports use the aliases in `tsconfig.json` (`@fixtures`, `@pages/*`, `@config/*` …).

## Naming

| Thing            | Rule                                                 | Example                                                       |
| ---------------- | ---------------------------------------------------- | ------------------------------------------------------------- |
| Spec file        | `kebab-case.spec.ts`; API specs end `.api.spec.ts`   | `three-way-match.spec.ts`                                     |
| Process folder   | business-process name, kebab-case                    | `procure-to-pay`                                              |
| Aggregate folder | singular aggregate, kebab-case                       | `api/aggregates/purchase/purchase-order`                      |
| Page object      | `<thing>.page.ts`, class `<Thing>Page`               | `vendor-bill.page.ts`                                         |
| Test title       | business behaviour, not implementation               | "bill quantity above received quantity is blocked at posting" |
| Journey tag      | `@journey-<kebab-name>`, registered in `JOURNEYS.md` | `@journey-credit-hold`                                        |

## Every test

- Has a **process or module tag**, a **persona tag** (when a role performs it), and a **priority tag**.
- Has a `requirement('ID')` annotation linking it to a requirement or user story.
- Uses `test.step` for each stage of a journey, so a failure names the stage.
- Ends in a **business outcome**: check stock, totals and ledger, not just that a button was clicked.

## Data

- **Each test creates its own data** through the API (`api.*.create(...factory())`), with unique names from `uid()`.
- No test depends on another test or on run order.
- Reference data (chart of accounts, tax codes) is seeded and read-only.
- Never assert an exact document number. Read it from the screen or API.
- Freeze the clock for ageing, due dates and period close.

## Locators and waiting

1. `getByRole` / `getByLabel` first, then `getByTestId` (`data-testid`).
2. No CSS or XPath chains on generated markup.
3. Use web-first assertions (`await expect(locator)…`). **No `waitForTimeout`** (lint error). For long jobs, poll the API.

## Put each check at the lowest layer that can prove it

| Behaviour                                            | Layer                                         |
| ---------------------------------------------------- | --------------------------------------------- |
| Calculation or rule with no database                 | Unit test (in the application repo, not here) |
| Required-field error, conditional field              | Component test / module spec                  |
| Posting writes balanced ledger lines and moves stock | `api/aggregates`                              |
| Endpoint rejects bad input or wrong role             | `api/aggregates`                              |
| A user completes a process across roles              | `e2e/processes`                               |
| Login and save after deploy                          | `smoke`                                       |
| 200 users at month end                               | Load tool (k6 / JMeter), not Playwright       |

## Stability

- At most one retry (CI only), always reported.
- A flaky test is quarantined within a day (`test.fixme` with a ticket link) and fixed within the sprint.
- Failed runs keep trace, screenshot and video (`reports/`).
- Update the test in the same change as the code. Never update a visual baseline only to turn a test green.

## Pull request checklist

- [ ] Placed by the four questions in the README
- [ ] Tags from `src/config/tags.ts`, journey registered in `docs/JOURNEYS.md`
- [ ] Creates its own data, no hard-coded numbers
- [ ] `npm run typecheck && npm run lint && npm run format:check` pass

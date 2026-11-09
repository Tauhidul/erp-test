# Journey and aggregate registry

A **process** is a folder. A **journey** is a named path through a process, expressed as a `@journey-*` tag, usually
one spec file. Register new journeys here before using the tag.

Requirement IDs are placeholders: replace them with the real IDs from your backlog.

## Procure to Pay (`@p2p`, `tests/e2e/processes/procure-to-pay/`)

| Journey tag                     | Personas                           | Apps                            | What it proves                                           | Spec                           |
| ------------------------------- | ---------------------------------- | ------------------------------- | -------------------------------------------------------- | ------------------------------ |
| `@journey-full-cycle`           | buyer, warehouse-clerk, accountant | Purchase, Inventory, Accounting | Order → receipt → bill → payment; stock and ledger agree | `happy-path.spec.ts`           |
| `@journey-requisition-approval` | buyer, finance-manager             | Purchase                        | Approval limit enforced before an order exists           | `requisition-approval.spec.ts` |
| `@journey-three-way-match`      | warehouse-clerk, accountant        | Inventory, Accounting           | Bill cannot exceed what was ordered and received         | `three-way-match.spec.ts`      |
| `@journey-vendor-payment`       | accountant                         | Accounting                      | Part payment leaves the right balance open               | `vendor-payment.spec.ts`       |

## Order to Cash (`@o2c`, `tests/e2e/processes/order-to-cash/`)

| Journey tag                 | Personas                               | Apps                         | What it proves                                               | Spec                       |
| --------------------------- | -------------------------------------- | ---------------------------- | ------------------------------------------------------------ | -------------------------- |
| `@journey-full-cycle`       | sales-rep, warehouse-clerk, accountant | Sales, Inventory, Accounting | Order → delivery → invoice → receipt; stock and ledger agree | `happy-path.spec.ts`       |
| `@journey-credit-hold`      | sales-rep, finance-manager             | Sales                        | Over-limit order is held until released                      | `credit-hold.spec.ts`      |
| `@journey-partial-delivery` | warehouse-clerk, accountant            | Inventory, Accounting        | Split deliveries invoice correctly                           | `partial-delivery.spec.ts` |

## Record to Report (`@r2r`, `tests/e2e/processes/record-to-report/`)

| Journey tag                         | Personas                    | Apps                        | What it proves                                           | Spec                                         |
| ----------------------------------- | --------------------------- | --------------------------- | -------------------------------------------------------- | -------------------------------------------- |
| `@journey-month-end-close`          | accountant, finance-manager | Accounting                  | Journal → trial balance → period close → posting blocked | `happy-path.spec.ts`, `period-close.spec.ts` |
| `@journey-subledger-reconciliation` | accountant                  | Accounting, Purchase, Sales | Control accounts equal sub-ledgers                       | `subledger-reconciliation.spec.ts`           |

`@journey-full-cycle` appears in each process. Combine it with the process tag to select one:
`--grep "(?=.*@o2c)(?=.*@journey-full-cycle)"`.

## Aggregates covered at API level (`tests/api/aggregates/<app>/<aggregate>/`)

| App        | Aggregate                                          | Spec                         | Status  |
| ---------- | -------------------------------------------------- | ---------------------------- | ------- |
| Purchase   | PurchaseOrder                                      | `purchase-order.api.spec.ts` | started |
| Sales      | SalesOrder                                         | `sales-order.api.spec.ts`    | started |
| Inventory  | StockMove                                          | `stock-move.api.spec.ts`     | started |
| Accounting | JournalEntry                                       | `journal-entry.api.spec.ts`  | started |
| Purchase   | Vendor, PurchaseRequest                            |                              | to add  |
| Sales      | Customer, Quotation                                |                              | to add  |
| Inventory  | Product, GoodsReceipt, Delivery, StockAdjustment   |                              | to add  |
| Accounting | VendorBill, CustomerInvoice, Payment, FiscalPeriod |                              | to add  |

## Adding a process, app or aggregate

- **New process** (for example `inventory-adjustment`): add `tests/e2e/processes/<name>/`, a `uiProject(...)` line in
  `playwright.config.ts`, a `TAG` entry, a script in `package.json`, and a section above.
- **New app**: add `tests/e2e/modules/<app>/`, `src/pages/<app>/`, `src/api-client/<app>.api.ts`,
  `src/data/factories/<app>.factory.ts`, and a module tag.
- **New aggregate**: add `tests/api/aggregates/<app>/<aggregate>/` and a row above.

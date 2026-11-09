# 🐛 Bug Tracker Checklist

Track your progress as you identify and fix bugs using GitHub Copilot.

## Legend
- ⬜ = Not started
- 🔍 = Identified with Copilot
- 🔧 = Fix applied
- ✅ = Tested & verified

## App Configuration Bugs (app.js / server.js)

| # | Bug Description | Severity | Status | Copilot Feature Used |
|---|----------------|----------|--------|---------------------|
| 1 | bodyParser.json() never called | 🔴 Critical | 🔧 | Copilot /fix |
| 2 | No CORS headers configured | 🟡 Medium | 🔧 | Copilot /fix |
| 3 | Route prefix typo "/ordrs" | 🔴 Critical | 🔧 | Copilot /fix |
| 4 | Missing global error handler | 🟡 Medium | 🔧 | Copilot /fix |
| 5 | Port hardcoded, no env fallback | 🟢 Low | 🔧 | Copilot /fix |
| 6 | No graceful shutdown handling | 🟢 Low | 🔧 | Copilot /fix |

## Data Model Bugs (order.js)

| # | Bug Description | Severity | Status | Copilot Feature Used |
|---|----------------|----------|--------|---------------------|
| 7 | uuid not imported | 🔴 Critical | 🔧 | Copilot /fix |
| 8 | Date.now missing parentheses | 🔴 Critical | 🔧 | Copilot /fix |
| 9 | Total price never calculated | 🟡 Medium | 🔧 | Copilot /fix |
| 10 | Loose equality (== vs ===) | 🟡 Medium | 🔧 | Copilot /fix |
| 11 | findById returns index not object | 🔴 Critical | 🔧 | Copilot /fix |
| 12 | update() overwrites entire object | 🔴 Critical | 🔧 | Copilot /fix |
| 13 | splice() misuse in delete() | 🔴 Critical | 🔧 | Copilot /fix |
| 14 | filter callback missing return | 🔴 Critical | 🔧 | Copilot /fix |
| 15 | No calculateTotal method | 🟡 Medium | 🔧 | Copilot /fix |
| 16 | No data validation method | 🟡 Medium | 🔧 | Copilot /fix |

## Controller Bugs (orderController.js)

| # | Bug Description | Severity | Status | Copilot Feature Used |
|---|----------------|----------|--------|---------------------|
| 17 | No empty-array differentiation | 🟢 Low | 🔧 | Copilot /fix |
| 18 | Exposes error stack trace | 🟡 Medium | 🔧 | Copilot /fix |
| 19 | getOrderById uses index (falsy 0) | 🔴 Critical | 🔧 | Copilot /fix |
| 20 | No input validation on create | 🟡 Medium | 🔧 | Copilot /fix |
| 21 | req.body undefined (from Bug #1) | 🔴 Critical | 🔧 | Copilot /fix |
| 22 | Returns 200 instead of 201 | 🟡 Medium | 🔧 | Copilot /fix |
| 23 | Wrong error status code | 🟢 Low | 🔧 | Copilot /fix |
| 24 | No check for empty update body | 🟡 Medium | 🔧 | Copilot /fix |
| 25 | Broken update returns bad data | 🔴 Critical | 🔧 | Copilot /fix |
| 26 | Returns 200 instead of 204 on delete | 🟢 Low | 🔧 | Copilot /fix |
| 27 | Uses req.params instead of req.query | 🔴 Critical | 🔧 | Copilot /fix |
| 28 | No status value validation | 🟡 Medium | 🔧 | Copilot /fix |
| 29 | reduce() no initial value | 🔴 Critical | 🔧 | Copilot /fix |
| 30 | .length() called as method | 🔴 Critical | 🔧 | Copilot /fix |
| 31 | `pending` not in quotes | 🔴 Critical | 🔧 | Copilot /fix |

## Route Bugs (orderRoutes.js)

| # | Bug Description | Severity | Status | Copilot Feature Used |
|---|----------------|----------|--------|---------------------|
| 32 | GET and POST swapped | 🔴 Critical | 🔧 | Copilot /fix |
| 33 | :orderId vs :id param mismatch | 🔴 Critical | 🔧 | Copilot /fix |
| 34 | /status conflicts with /:orderId | 🟡 Medium | 🔧 | Copilot /fix |
| 35 | Wrong controller method name | 🔴 Critical | 🔧 | Copilot /fix |

## Middleware Bugs (auth.js)

| # | Bug Description | Severity | Status | Copilot Feature Used |
|---|----------------|----------|--------|---------------------|
| 36 | Case-sensitive header access | 🟡 Medium | 🔧 | Copilot /fix |
| 37 | Returns 403 instead of 401 | 🟡 Medium | 🔧 | Copilot /fix |
| 38 | No actual token verification | 🔴 Critical | 🔧 | Copilot /fix |
| 39 | No user info extracted from token | 🟡 Medium | 🔧 | Copilot /fix |

## Utility Bugs (helpers.js)

| # | Bug Description | Severity | Status | Copilot Feature Used |
|---|----------------|----------|--------|---------------------|
| 40 | Floating point price issues | 🟡 Medium | 🔧 | Copilot /fix |
| 41 | for...in on array | 🔴 Critical | 🔧 | Copilot /fix |
| 42 | price * price instead of price * quantity | 🔴 Critical | 🔧 | Copilot /fix |
| 43 | Validation logic inverted | 🔴 Critical | 🔧 | Copilot /fix |
| 44 | Typo in status values array | 🟡 Medium | 🔧 | Copilot /fix |
| 45 | Case-sensitive includes() | 🟡 Medium | 🔧 | Copilot /fix |
| 46 | Pagination off-by-one error | 🟡 Medium | 🔧 | Copilot /fix |
| 47 | Page starts from 0 not 1 | 🟡 Medium | 🔧 | Copilot /fix |
| 48 | Slice end index wrong | 🟡 Medium | 🔧 | Copilot /fix |
| 49 | No input sanitization (XSS risk) | 🟡 Medium | 🔧 | Copilot /fix |
| 50 | toISOString() on function reference | 🔴 Critical | 🔧 | Copilot /fix |

---
**Total Bugs: 50** | 🔴 Critical: 24 | 🟡 Medium: 20 | 🟢 Low: 6

# Issues Tracker

**Project:** Playwright Test Automation Framework for SaaS Applications  
**Started:** 2026-06-08  
**Purpose:** Document all issues, errors, and resolutions encountered during development

---

## Table of Contents

1. [Configuration Issues](#configuration-issues)
2. [Code Quality Issues](#code-quality-issues)
3. [Architecture Issues](#architecture-issues)
4. [Dependency Issues](#dependency-issues)

---

## Configuration Issues

### Issue #1: slowMo Property Typo in playwright.config.ts

**Title:** Incorrect property name causing undefined slowMo configuration

**Description:**  
The playwright.config.ts file had a typo in the browser launch options where `setSlowMo` was used instead of `slowMo`.

**Error:**
```
Property 'setSlowMo' does not exist on type 'LaunchOptions'
Did you mean 'slowMo'?
```

**Resolution:**  
Changed `setSlowMo: setSlowMo()` to `slowMo: setSlowMo()` on line 30 of playwright.config.ts

**Reason for Resolution:**  
Playwright API uses `slowMo` as the correct property name in LaunchOptions interface. This is the official API naming convention from the Playwright library.

---

### Issue #2: Missing Type Assertion in tsconfig.json Validation

**Title:** TypeScript strict mode - Cannot access array with string key

**Description:**  
In timeout.config.ts, accessing `levels[config.logLevel]` failed type checking because TypeScript couldn't guarantee the key exists in the object.

**Error:**
```typescript
const currentLevel = levels[config.logLevel]  // Type error
```

**Resolution:**  
Added type assertion: `levels[config.logLevel as keyof typeof levels]`

**Reason for Resolution:**  
The `as keyof typeof` syntax tells TypeScript that `config.logLevel` is guaranteed to be one of the keys in the `levels` object. This is safe because logLevel is validated in environment.config.ts, but TypeScript needs explicit assertion for strict mode compliance.

---

## Code Quality Issues

### Issue #3: Comment Typos in logger.ts

**Title:** Typos in code comments reducing documentation quality

**Description:**  
Two typos were found in logger.ts comments:
- Line 10: "methhod" instead of "method"
- Line 10: "Cleck" instead of "Check"

**Error:**
```typescript
// Helper methhod: Check if a log level should be shown
// Cleck if we should log based on current level
```

**Resolution:**  
Corrected comments to:
```typescript
// Helper method: Check if a log level should be shown
// Check if we should log based on current level
```

**Reason for Resolution:**  
Code comments are documentation. Typos reduce clarity and professionalism. Comments should be grammatically correct to maintain code quality standards.

---

### Issue #4: Wrong Return Type in verifyDashboardLoaded()

**Title:** Return type mismatch - Promise<void> instead of Promise<boolean>

**Description:**  
The verifyDashboardLoaded() method in DashboardPage.ts was declared with return type `Promise<void>` but actually returned a boolean value.

**Error:**
```typescript
async verifyDashboardLoaded(): Promise<void> {
  return await this.isVisible(...)  // Returns boolean, not void!
}
```

**Resolution:**  
Changed return type to `Promise<boolean>`:
```typescript
async verifyDashboardLoaded(): Promise<boolean> {
  return await this.isVisible(...)
}
```

**Reason for Resolution:**  
TypeScript strict mode requires accurate return types. Methods that return values cannot have return type `void`. The actual behavior was returning a boolean, so the type annotation must match the implementation.

---

### Issue #5: Attribute Selector Typo in DashboardPage.ts

**Title:** CSS attribute selector typo (date-testid vs data-testid)

**Description:**  
Selector used incorrect attribute name `date-testid` instead of the standard `data-testid`.

**Error:**
```typescript
DASHBOARD_CANVAS: '[date-testid="StyledWrapper"]'  // Wrong attribute
```

**Resolution:**  
Corrected to proper attribute name:
```typescript
DASHBOARD_CANVAS: '[data-testid="StyledWrapper"]'
```

**Reason for Resolution:**  
`data-testid` is the standard HTML attribute naming convention for test identifiers. `date-testid` is not a valid attribute and won't match any elements on the page. Always use `data-*` format for custom data attributes.

---

### Issue #6: Negation Operator Placement in WaitHelper.ts

**Title:** Incorrect operator precedence - await vs negation (!)

**Description:**  
In waitForElementToDisappear(), the negation operator was placed before await, causing syntax confusion.

**Error:**
```typescript
return await !this.page.locator(selector).isVisible()  // Wrong order
```

**Resolution:**  
Corrected to apply negation to the awaited result:
```typescript
return !(await this.page.locator(selector).isVisible())  // Correct
```

**Reason for Resolution:**  
The `!` operator negates a boolean value. Since `isVisible()` returns a Promise<boolean>, you must `await` it first to get the boolean, then apply `!`. Awaiting the negated Promise would fail.

---

## Architecture Issues

### Issue #7: Incorrect Class Extension in LeftNavigation.ts

**Title:** LeftNavigation extends BaseHelper incorrectly

**Description:**  
LeftNavigation.ts was declared as extending BaseHelper, causing incorrect inheritance hierarchy and missing constructor.

**Error:**
```typescript
export class LeftNavigation extends BaseHelper {
  constructor(page: Page) {
    super(page)  // BaseHelper doesn't accept page!
  }
}
```

**Resolution:**  
Changed LeftNavigation to be a standalone class:
```typescript
export class LeftNavigation {
  private page: Page
  
  constructor(page: Page) {
    this.page = page
  }
}
```

**Reason for Resolution:**  
BaseHelper provides static utility methods and doesn't have instance state. LeftNavigation needs instance state (this.page) to interact with the browser. These are different architectural patterns - utilities vs. UI components. LeftNavigation should be independent.

---

### Issue #8: Static vs Instance Methods Confusion in WaitHelper.ts

**Title:** Methods declared as static when they need instance access

**Description:**  
Initial WaitHelper implementation used static methods, which cannot access instance properties like `this.page`.

**Error:**
```typescript
static async waitForElement(selector: string): Promise<void> {
  // Can't use this.page in static method!
  await this.page.locator(selector).isVisible()
}
```

**Resolution:**  
Changed to instance methods:
```typescript
async waitForElement(selector: string, timeout?: number): Promise<void> {
  logger.info(`Waiting for element: ${selector}`)
  await BaseHelper.waitUntil(
    async () => await this.page.locator(selector).isVisible(),
    timeout || timeouts.ASSERTION
  )
}
```

**Reason for Resolution:**  
Static methods are called on the class itself and don't have access to instance state. Since WaitHelper needs to use `this.page` (a Playwright Page instance), methods must be instance methods. Instance methods require creating an instance: `new WaitHelper(page)`.

---

### Issue #9: Incorrect Constants Structure Design

**Title:** Constants.ts contained selectors, test data, and timeouts - wrong separation of concerns

**Description:**  
Initial constants.ts design mixed different types of constants:
- Selectors (should be in Page Objects)
- Test data (should be in factories/testData.json)
- Product messages (should be in separate messages.ts)
- Technical constants (should stay in constants.ts)

**Error:**
```typescript
export const SELECTORS = { LOGIN_INPUT: 'input[id="username"]' }
export const TEST_DATA = { VALID_EMAIL: 'test@example.com' }
export const MESSAGES = { SUCCESS: 'Operation successful' }
export const HTTP_STATUS = { OK: 200 }
```

**Resolution:**  
Separated into proper locations:
- **constants.ts:** Only HTTP_STATUS and POLLING (technical constants)
- **Page Objects:** Selectors in private readonly objects
- **Factories (Phase 6):** Test data generators
- **messages.ts (Phase 12):** Product copy and error messages

**Reason for Resolution:**  
This follows the Single Responsibility Principle. Each file should have one reason to change:
- HTTP_STATUS changes when API contracts change
- Selectors change when UI changes
- Test data changes when test scenarios change
- Messages change when product copy changes

Mixing them makes code fragile and hard to maintain.

---

## Dependency Issues

### Issue #10: BaseAPIClient File Location

**Title:** API client file created in wrong directory location

**Description:**  
BaseAPIClient.ts was initially created at `/src/BaseApiClient.ts` instead of the correct location `/src/api/BaseAPIClient.ts`.

**Error:**
```
File created at: /src/BaseApiClient.ts (WRONG)
Should be at: /src/api/BaseAPIClient.ts (CORRECT)
```

**Resolution:**  
Recreated the file at the correct location: `/src/api/BaseAPIClient.ts` with proper fixes:
- Fixed import paths (from `./utils/logger` to `../utils/logger`)
- Fixed "header" typo to "headers"
- Ensured consistent return types
- Removed empty helper methods

**Reason for Resolution:**  
Proper file organization (API-related files in `/api` directory) makes the codebase maintainable and follows the established project structure. Wrong imports would cause module resolution failures.

---

### Issue #11: Missing Quotes in Import Statements

**Title:** Import statement syntax errors - missing quotes around module names

**Description:**  
EndpointsConfig.ts had import statements without quotes:

**Error:**
```typescript
import fs from fs;           // ❌ Missing quotes
import yaml from js-yaml;    // ❌ Missing quotes
import path from path;       // ❌ Missing quotes
```

**Resolution:**  
Added quotes to all import statements:
```typescript
import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'
```

**Reason for Resolution:**  
ES6 module import syntax requires module names to be string literals. Without quotes, the parser treats them as variable names instead of module identifiers, causing "module not found" errors.

---

### Issue #12: npm Cache Permission Error

**Title:** npm cache corrupted with root-owned files preventing installation

**Description:**  
Attempting to install js-yaml failed with permission denied errors in npm cache directory.

**Error:**
```
npm error code EACCES
npm error syscall mkdir
npm error path /Users/rakeshmanoharan/.npm/_cacache/...
npm error errno -13
npm error Your cache folder contains root-owned files
```

**Resolution:**  
Fixed with two commands:
```bash
sudo chown -R 501:20 "/Users/rakeshmanoharan/.npm"
npm cache clean --force
npm install js-yaml @types/js-yaml @types/node
```

**Reason for Resolution:**  
The npm cache gets corrupted when files are created with different permissions (root vs user). The `chown` command fixes file ownership to the current user (UID 501, GID 20 on macOS). This allows npm to properly manage the cache directory. Clearing cache ensures no corrupt metadata remains.

---

## Statistics

| Category | Count |
|----------|-------|
| Configuration Issues | 2 |
| Code Quality Issues | 5 |
| Architecture Issues | 3 |
| Dependency Issues | 2 |
| **Total Issues** | **12** |

---

## Lessons Learned

1. **TypeScript Strict Mode** — Always pay attention to type errors; they prevent runtime bugs
2. **Architecture First** — Plan class responsibilities before coding (static vs instance, inheritance vs composition)
3. **Separation of Concerns** — Each file should have one reason to change
4. **Import Syntax** — Always use quotes around module names in ES6 imports
5. **File Organization** — Follow established directory structure from the start
6. **Comments Matter** — Keep documentation clear and typo-free
7. **CSS Selectors** — Use standard attribute naming conventions (data-*)
8. **Permission Issues** — npm cache issues require specific fixes, not just retrying

---

**Last Updated:** 2026-06-08  
**Status:** Active Tracking  
**Next Phase:** Phase 5 API Testing Infrastructure - Continued

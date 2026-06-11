import { test } from '../fixtures/test.fixtures';
import { expect } from '@playwright/test';

// ============================================
// BASIC PLAYWRIGHT SPEC FILE TEMPLATE
// ============================================
// This file demonstrates the structure and patterns for automating any web application
// using Playwright + TypeScript + Page Object Model (POM) pattern.
//
// How to use this template:
// 1. Create a new file: tests/user/{feature}.spec.ts
// 2. Import fixtures and dependencies (see imports above)
// 3. Use test.describe() for test suites (optional but recommended)
// 4. Use test() for individual test cases
// 5. Follow the naming convention: GIVEN-WHEN-THEN or the pattern shown below
// ============================================

// ============================================
// PART 1: TEST SUITE GROUPING
// ============================================
// Use test.describe() to group related tests together.
// This creates a test suite that organizes tests logically.
// Benefits: Better reporting, easier navigation in test results.
//
// Syntax:
//   test.describe('Suite Name', () => {
//     // All tests here belong to this suite
//   });
// ============================================

test.describe('User Authentication - Complete Example', () => {
  // ============================================
  // PART 2: TEST SETUP & TEARDOWN (Optional)
  // ============================================
  // Use test.beforeEach() to run code BEFORE each test
  // Use test.afterEach() to run code AFTER each test
  //
  // Common uses:
  // - beforeEach: Navigate to login page, create test data, reset state
  // - afterEach: Clean up created data, logout, take screenshots on failure
  //
  // Note: The global hooks.ts file already has beforeAll, beforeEach, afterEach, afterAll
  // Use these hooks for ADDITIONAL test-specific setup/teardown
  // ============================================

  test.beforeEach(async ({ page }) => {
    // Optional: Add test-specific setup here
    // Example: await page.goto('/login');
  });

  test.afterEach(async ({ page }) => {
    // Optional: Add test-specific cleanup here
    // Example: await page.context().clearCookies();
  });

  // ============================================
  // PART 3: BASIC TEST CASE - SIMPLE EXAMPLE
  // ============================================
  // This is the simplest form of a test case.
  // It takes the 'page' fixture (a Playwright Page object) as a parameter.
  //
  // Test Structure:
  // 1. ARRANGE: Set up the test environment
  // 2. ACT: Perform the action you want to test
  // 3. ASSERT: Verify the expected outcome
  //
  // How to automate:
  // - Use page.goto(url) to navigate
  // - Use page.fill(selector, text) to enter text
  // - Use page.click(selector) to click buttons
  // - Use page.locator(selector) to find elements
  // - Use expect() to verify the outcome
  // ============================================

  test('EXAMPLE: User can login with valid credentials', async ({ page }) => {
    // ARRANGE: Navigate to login page
    await page.goto('/login');

    // ACT: Enter credentials and submit
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // ASSERT: Verify user is logged in
    // Method 1: Wait for URL change
    await page.waitForURL('/dashboard');

    // Method 2: Verify an element is visible
    await expect(page.locator('text=Welcome, User')).toBeVisible();
  });

  // ============================================
  // PART 4: TEST WITH PAGE OBJECTS - RECOMMENDED
  // ============================================
  // This approach uses Page Object Model (POM) pattern.
  // Benefits:
  // - Encapsulate selectors and actions in page classes
  // - Easier to maintain when UI changes
  // - Reusable across multiple tests
  // - More readable test code
  //
  // Pattern:
  // 1. Create a page class in src/pages/ (e.g., LoginPage.ts)
  // 2. Define selectors and methods in the page class
  // 3. Use the page class in tests
  //
  // Example page class structure:
  //   class LoginPage extends BasePage {
  //     async login(email: string, password: string) {
  //       await this.page.fill('input[name="email"]', email);
  //       await this.page.fill('input[name="password"]', password);
  //       await this.page.click('button[type="submit"]');
  //       await this.page.waitForURL('/dashboard');
  //     }
  //   }
  //
  // How to use in tests:
  //   import { LoginPage } from '../../src/pages/LoginPage';
  //   const loginPage = new LoginPage(page);
  //   await loginPage.login('user@example.com', 'password123');
  // ============================================

  test('EXAMPLE: Test with page object (if you have LoginPage created)', async ({
    page,
  }) => {
    // Uncomment when you create src/pages/LoginPage.ts
    // import { LoginPage } from '../../src/pages/LoginPage';
    // const loginPage = new LoginPage(page);
    // await loginPage.login('user@example.com', 'password123');
    // await expect(page).toHaveURL('/dashboard');
  });

  // ============================================
  // PART 5: TEST WITH FIXTURES - ADVANCED
  // ============================================
  // Fixtures allow you to inject pre-configured objects into tests.
  // This is the most powerful and maintainable approach.
  //
  // Benefits:
  // - Pre-configured page objects (authenticated pages, API clients)
  // - Automatic setup/teardown
  // - Reusable across multiple tests
  // - Type-safe
  //
  // Available fixtures (from tests/fixtures/test.fixtures.ts):
  // - page: Regular Playwright page
  // - authenticatedPage: Page already logged in
  // - context: Playwright browser context
  //
  // Advanced fixtures (from tests/fixtures/freshsales.fixtures.ts on freshsales-main branch):
  // - contactsAPI: API client for Contacts
  // - validContact: Pre-built valid contact data
  // - invalidContact: Pre-built invalid contact data
  //
  // How to create custom fixtures:
  // 1. In tests/fixtures/test.fixtures.ts, add a new fixture
  // 2. Import it in your test
  // 3. Use as a parameter in test function
  // ============================================

  test('EXAMPLE: Test with authenticatedPage fixture', async ({
    authenticatedPage,
  }) => {
    // The authenticatedPage is a pre-configured page that's already logged in
    // No need to manually login - the fixture handles it!
    // You can start directly with the authenticated action

    // Example: Navigate to a protected page
    await authenticatedPage.goto('/dashboard');

    // Verify you're on the dashboard
    await expect(authenticatedPage.locator('text=Dashboard')).toBeVisible();
  });

  // ============================================
  // PART 6: ASSERTIONS - VERIFYING OUTCOMES
  // ============================================
  // Use expect() to verify that something happened as expected.
  //
  // Common assertions:
  // - expect(element).toBeVisible()      → Element is visible on page
  // - expect(element).toBeHidden()       → Element is hidden
  // - expect(element).toContainText('x') → Element contains text
  // - expect(page).toHaveURL('/path')    → Current URL matches
  // - expect(element).toHaveValue('x')   → Input has value
  // - expect(element).toBeEnabled()      → Button/input is enabled
  // - expect(element).toBeDisabled()     → Button/input is disabled
  // - expect(element).toHaveCount(n)     → Found n elements
  //
  // More assertions: https://playwright.dev/docs/test-assertions
  // ============================================

  test('EXAMPLE: Different assertion types', async ({ page }) => {
    await page.goto('/');

    // Assert element visibility
    await expect(page.locator('button:has-text("Login")')).toBeVisible();

    // Assert text content
    await expect(page.locator('h1')).toContainText('Welcome');

    // Assert URL
    await expect(page).toHaveURL('/');

    // Assert element count
    const items = page.locator('.nav-item');
    await expect(items).toHaveCount(5);
  });

  // ============================================
  // PART 7: WORKING WITH DIFFERENT ELEMENTS
  // ============================================
  // Different ways to interact with elements on the page.
  //
  // How to find elements (selectors):
  // - CSS selectors: 'button.primary', 'input[type="email"]', 'div > span'
  // - XPath: '//button[contains(text(), "Login")]'
  // - Text matchers: 'text=Click me', ':has-text("Login")'
  // - By role: '[role="button"]', '[role="textbox"]'
  // - Combinations: 'form button:has-text("Submit")'
  //
  // Common actions:
  // - click()              → Click an element
  // - fill()               → Clear and fill text input
  // - type()               → Type text character by character
  // - select()             → Select option from dropdown
  // - check() / uncheck()  → Check/uncheck checkbox
  // - press()              → Press keyboard key (Enter, Tab, etc.)
  // - focus()              → Focus an element
  //
  // More actions: https://playwright.dev/docs/api/class-locator
  // ============================================

  test('EXAMPLE: Interact with different element types', async ({ page }) => {
    await page.goto('/forms');

    // Text input
    await page.fill('input[name="firstName"]', 'John');

    // Dropdown
    await page.selectOption('select[name="country"]', 'USA');

    // Checkbox
    await page.check('input[type="checkbox"][name="agree"]');

    // Radio button
    await page.click('input[type="radio"][value="yes"]');

    // Button click
    await page.click('button:has-text("Submit")');

    // Type slowly (useful for testing autocomplete)
    await page.locator('input[name="search"]').type('query', { delay: 100 });

    // Press keyboard key
    await page.press('input[name="search"]', 'Enter');
  });

  // ============================================
  // PART 8: WAITING FOR ELEMENTS
  // ============================================
  // Often you need to wait for an element or condition to be true.
  //
  // Automatic waits (Playwright does this by default):
  // - page.click() waits for element to be visible
  // - page.fill() waits for element to be enabled
  // - expect() waits for assertion to pass (5 second default)
  //
  // Explicit waits (use when automatic wait isn't enough):
  // - page.waitForURL()         → Wait for URL to change
  // - page.waitForSelector()    → Wait for element to exist in DOM
  // - page.locator().waitFor()  → Wait for element to be visible
  // - page.waitForLoadState()   → Wait for page load to complete
  // - page.waitForTimeout()     → Simple sleep (avoid when possible)
  //
  // Best practice: Prefer expect() over explicit waits when possible
  // ============================================

  test('EXAMPLE: Waiting for elements and conditions', async ({ page }) => {
    await page.goto('/dashboard');

    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');

    // Wait for URL to change (after clicking submit)
    await page.click('button[type="submit"]');
    await page.waitForURL('/success');

    // Wait for element to be visible
    await page.locator('.success-message').waitFor({ state: 'visible' });

    // Wait with timeout (default is 30s from config, can override)
    await expect(page.locator('.loading-spinner')).toBeHidden({
      timeout: 10000,
    });
  });

  // ============================================
  // PART 9: HANDLING MULTIPLE PAGES/WINDOWS
  // ============================================
  // Sometimes tests need to open new windows/tabs or work with popups.
  //
  // Common scenarios:
  // - Opening a new tab via clicking a link
  // - Handling PDF downloads
  // - Switching between multiple windows
  //
  // How to handle:
  // - Use page.context().waitForEvent('page') to catch new pages
  // - Extract the new page and interact with it
  // - Return to original page if needed
  // ============================================

  test('EXAMPLE: Handling new page/window', async ({ context, page }) => {
    // Start listening for new page
    const pagePromise = context.waitForEvent('page');

    // Action that opens new page (e.g., target="_blank")
    await page.click('a[target="_blank"]');

    // Get the new page
    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    // Interact with new page
    await expect(newPage).toHaveURL(/new-url/);

    // Close new page and go back to original
    await newPage.close();
  });

  // ============================================
  // PART 10: DEBUGGING TESTS
  // ============================================
  // Sometimes tests fail and you need to debug them.
  //
  // Debugging techniques:
  // 1. Use page.screenshot() to capture screen state
  //    await page.screenshot({ path: 'debug.png' });
  //
  // 2. Use page.locator().screenshot() for element screenshot
  //    await page.locator('button').screenshot({ path: 'button.png' });
  //
  // 3. Use page.content() to see HTML
  //    const html = await page.content();
  //    console.log(html);
  //
  // 4. Run test with --debug flag
  //    npx playwright test --debug
  //
  // 5. Use page.pause() to pause execution
  //    await page.pause();
  //    // Inspector opens, you can interact with page and resume
  //
  // 6. Check locator elements
  //    const count = await page.locator('.item').count();
  //    console.log('Items found:', count);
  // ============================================

  test('EXAMPLE: Debug test (remove .skip to run)', async ({ page }) => {
    // Use test.skip() to skip a specific test
    test.skip();

    await page.goto('/');

    // Take screenshot for debugging
    await page.screenshot({ path: 'debug.png' });

    // Use pause to stop and interact manually
    // await page.pause();

    // Log element count for debugging
    console.log(
      'Buttons found:',
      await page.locator('button').count()
    );
  });

  // ============================================
  // PART 11: PARAMETERIZED TESTS
  // ============================================
  // Run the same test with different input values.
  //
  // Use test.each() for parameterized tests
  // Each array represents one test run with different values
  // ============================================

  test.describe('Parameterized Tests', () => {
    const testData = [
      { username: 'user1@test.com', password: 'pass123', expected: 'User1' },
      { username: 'user2@test.com', password: 'pass456', expected: 'User2' },
      { username: 'user3@test.com', password: 'pass789', expected: 'User3' },
    ];

    testData.forEach(({ username, password, expected }) => {
      test(`EXAMPLE: Login as ${username}`, async ({ page }) => {
        await page.goto('/login');
        await page.fill('input[name="email"]', username);
        await page.fill('input[name="password"]', password);
        await page.click('button[type="submit"]');

        // Verify expected result
        await expect(page.locator(`text=${expected}`)).toBeVisible();
      });
    });
  });

  // ============================================
  // PART 12: SKIPPING AND MARKING TESTS
  // ============================================
  // Control test execution with tags and skip/only.
  //
  // Use @tag annotation for test categorization:
  // - @smoke: Quick tests for critical path
  // - @regression: Comprehensive tests
  // - @wip: Work in progress (usually skipped)
  // - @flaky: Known to be flaky (run with caution)
  //
  // Use test.skip() to skip a test
  // Use test.only() to run only this test (useful during development)
  // ============================================

  test('@smoke User can logout', async ({ authenticatedPage }) => {
    // This test is tagged as @smoke
    // Run only @smoke tests: npx playwright test --grep @smoke

    await authenticatedPage.goto('/dashboard');
    await authenticatedPage.click('button:has-text("Logout")');
    await expect(authenticatedPage).toHaveURL('/login');
  });

  test('@wip This test is work in progress', async ({ page }) => {
    // Skip this test - marked as WIP
    test.skip();

    // Test code here...
  });

  // ============================================
  // PART 13: NETWORK AND API TESTING
  // ============================================
  // Test API calls and mock network responses.
  //
  // Common scenarios:
  // - Verify network request is made
  // - Mock API response to test error handling
  // - Verify request headers/body
  // ============================================

  test('EXAMPLE: Intercept network requests', async ({ page }) => {
    // Listen for specific API calls
    const apiCallPromise = page.waitForResponse(
      (response) => response.url().includes('/api/users')
    );

    // Action that triggers API call
    await page.click('button:has-text("Load Users")');

    // Get the response
    const apiResponse = await apiCallPromise;
    expect(apiResponse.status()).toBe(200);
  });

  test('EXAMPLE: Mock network response', async ({ page }) => {
    // Mock failed API response
    await page.route('**/api/users', (route) => {
      route.abort('failed');
    });

    // Trigger action
    await page.goto('/users');

    // Verify error message is shown
    await expect(page.locator('text=Error loading users')).toBeVisible();
  });
});

// ============================================
// ADDITIONAL RESOURCES
// ============================================
// Playwright Documentation: https://playwright.dev
// Test Assertions: https://playwright.dev/docs/test-assertions
// Locators: https://playwright.dev/docs/locators
// Browser Context: https://playwright.dev/docs/api/class-browsercontext
// Test Fixtures: https://playwright.dev/docs/test-fixtures
//
// Tips for writing better tests:
// 1. One assertion per test (or related assertions)
// 2. Use descriptive test names
// 3. Follow AAA pattern: Arrange, Act, Assert
// 4. Use page objects to encapsulate selectors
// 5. Avoid hard sleeps - use waits instead
// 6. Make tests independent (no test should depend on another)
// 7. Use fixtures for common setup
// 8. Tag tests for easy filtering (@smoke, @regression, etc.)
// ============================================

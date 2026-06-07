# Playwright Test Automation Framework for SaaS Applications

A production-ready, enterprise-grade Playwright automation framework built with TypeScript. Clone this repo and start testing in 30 seconds.

**Features:**
- ✅ POM (Page Object Model) compliant architecture
- ✅ SOLID & OOP principles throughout
- ✅ Multi-environment support (dev, staging, production)
- ✅ Multi-browser testing (Chromium, Firefox, WebKit)
- ✅ API testing with BaseAPIClient & endpoint management
- ✅ Test data factories using FactoryBot pattern
- ✅ API response schema validation
- ✅ Jenkins & Docker ready
- ✅ GitHub Actions CI/CD pipeline
- ✅ Allure & HTML reporting
- ✅ Parallel test execution
- ✅ Industry standard best practices

---

## **Quick Start (30 seconds)**

```bash
# 1. Clone the repository
git clone https://github.com/your-org/freshsales-playwright-ts.git
cd freshsales-playwright-ts

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env.dev

# 4. Run smoke tests
npm run test:smoke

# 5. View report
npx playwright show-report
```

That's it! Tests run in parallel, reports generate automatically.

---

## **System Requirements**

| Requirement | Version | Notes |
|-------------|---------|-------|
| **Node.js** | 18+ | LTS recommended |
| **npm** | 8+ | Or yarn/pnpm |
| **Playwright** | 1.40+ | Auto-installed via npm |
| **TypeScript** | 5.0+ | Dev dependency |
| **Docker** | 20.10+ | Optional, for containerized runs |
| **Java** | 11+ | Optional, for Allure reports |

---

## **Installation**

### **1. Clone Repository**

```bash
git clone https://github.com/your-org/freshsales-playwright-ts.git
cd freshsales-playwright-ts
```

### **2. Install Dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

### **3. Install Playwright Browsers**

```bash
npx playwright install
# or automatically done on first run
```

### **4. Configure Environment**

```bash
# Copy environment template
cp .env.example .env.dev

# Edit with your environment details
nano .env.dev
# or
code .env.dev
```

**Environment variables to set:**
```bash
# App URLs
BASE_URL=https://dev.yourapp.com
API_BASE_URL=https://api-dev.yourapp.com

# Credentials
TEST_EMAIL=test@example.com
TEST_PASSWORD=password123

# Browser settings
BROWSER=chromium  # chromium | firefox | webkit
HEADLESS=true     # true | false

# Timeouts
DEFAULT_TIMEOUT=30000
WAIT_TIMEOUT=5000

# Logging
LOG_LEVEL=info    # debug | info | warn | error
```

### **5. Verify Installation**

```bash
npm run test:smoke
```

If all tests pass ✅, you're ready to go!

---

## **Project Structure**

```
freshsales-playwright-ts/
│
├── src/
│   ├── pages/                           # UI Page Objects (POM)
│   │   ├── BasePage.ts                 # Base page class with common actions
│   │   ├── LoginPage.ts                # Specific page implementations
│   │   ├── DashboardPage.ts
│   │   └── [FeaturePage].ts
│   │
│   ├── helpers/                        # Utilities & Helper Classes
│   │   ├── BaseHelper.ts               # Common helper methods
│   │   ├── BrowserHelper.ts            # Multi-browser management
│   │   ├── WaitHelper.ts               # Explicit waits & polling
│   │   ├── LoggerHelper.ts             # Logging utilities
│   │   └── [SpecificHelper].ts
│   │
│   ├── api/                            # API Testing Layer
│   │   ├── BaseAPIClient.ts            # Abstract base API client
│   │   ├── EndpointsConfig.ts          # Loads endpoints from YAML
│   │   ├── [ServiceName]Client.ts      # Service-specific clients
│   │   └── endpoints.yaml              # Centralized endpoint definitions
│   │
│   ├── fixtures/                       # Test Data & Factories
│   │   ├── factories/                  # FactoryBot-style factories
│   │   │   ├── UserFactory.ts
│   │   │   ├── PayloadFactory.ts
│   │   │   └── [Entity]Factory.ts
│   │   ├── data/                       # Static test data
│   │   │   └── testData.json
│   │   └── seeds/                      # Database seed scripts
│   │
│   ├── schemas/                        # API Response Validation
│   │   ├── UserSchema.ts               # Joi/Zod schemas
│   │   ├── OrderSchema.ts
│   │   └── [Entity]Schema.ts
│   │
│   ├── config/                         # Configuration
│   │   ├── driver.config.ts            # Browser & driver settings
│   │   ├── environment.config.ts       # Environment-specific config
│   │   └── timeout.config.ts
│   │
│   └── utils/                          # General Utilities
│       ├── Logger.ts                   # Logging service
│       ├── Reporter.ts                 # Report generation
│       └── constants.ts                # Application constants
│
├── tests/
│   ├── ui/                             # UI/E2E Tests
│   │   ├── smoke/
│   │   │   └── login.spec.ts          # @smoke tagged tests
│   │   ├── regression/
│   │   │   └── dashboard.spec.ts      # @regression tagged tests
│   │   └── [feature].spec.ts
│   │
│   ├── api/                            # API Tests
│   │   ├── smoke/
│   │   │   └── users.spec.ts          # @smoke API tests
│   │   ├── regression/
│   │   │   └── orders.spec.ts         # @regression API tests
│   │   └── [endpoint].spec.ts
│   │
│   └── fixtures/
│       └── test.fixtures.ts            # Shared test fixtures
│
├── .github/
│   └── workflows/
│       ├── smoke-tests.yml             # GitHub Actions: smoke tests on push
│       ├── full-tests.yml              # GitHub Actions: full suite on PR
│       └── docker-build.yml            # GitHub Actions: Docker build
│
├── jenkins/
│   ├── Jenkinsfile                     # Jenkins declarative pipeline
│   ├── scripts/
│   │   ├── run-smoke-tests.sh         # Shared execution script
│   │   ├── generate-report.sh
│   │   ├── cleanup.sh
│   │   └── notify.sh                   # Slack/email notifications
│   ├── config/
│   │   └── jenkins-env.template       # Jenkins environment template
│   └── docs/
│       ├── JENKINS_SETUP.md
│       └── JENKINS_TROUBLESHOOTING.md
│
├── .env.example                        # Environment template
├── .env.dev                            # Dev environment (gitignored)
├── .env.staging                        # Staging environment (gitignored)
├── .env.production                     # Prod environment (gitignored)
│
├── playwright.config.ts                # Playwright configuration
├── smoke.config.ts                     # Smoke test-specific config
├── tsconfig.json                       # TypeScript configuration
├── eslint.config.js                    # ESLint configuration
├── prettier.config.js                  # Code formatting
│
├── Dockerfile                          # Docker image for test execution
├── docker-compose.yml                  # Docker Compose (if needed)
├── Jenkinsfile                         # Jenkins pipeline
│
├── package.json                        # Dependencies & scripts
├── package-lock.json
│
└── README.md                           # This file

```

---

## **Architecture & Implementation**

### **1. Page Object Model (POM)**

**Philosophy:** Encapsulate UI interactions, expose business logic.

**BasePage Class:**
```
BasePage
  ├─ Common element interactions (click, fill, wait, scroll)
  ├─ Locator management (private methods)
  ├─ Implicit wait handling
  ├─ Screenshot & logging utilities
  └─ Error handling & retry logic

Derived Pages (LoginPage, DashboardPage, etc.)
  ├─ Inherit common functionality
  ├─ Define page-specific locators
  ├─ Expose business methods (login(), logout(), etc.)
  └─ No test logic in pages
```

**Key Principles:**
- Pages represent logical views/features
- Only public methods expose business logic
- Locators are private/protected
- One responsibility per page

**Benefits:**
- Maintainability: Change UI → Update one page object
- Readability: Tests read like requirements
- Reusability: Share pages across test files
- Type safety: TypeScript catches locator errors

---

### **2. SOLID Principles**

| Principle | Implementation |
|-----------|-----------------|
| **Single Responsibility** | Each class has one reason to change (Pages, APIClients, Helpers, Factories are separate) |
| **Open/Closed** | Abstract BasePage; extend don't modify. New pages inherit, not rewrite |
| **Liskov Substitution** | All API clients implement common interface; drivers are interchangeable |
| **Interface Segregation** | Separate interfaces for page actions, API operations, reporting, factories |
| **Dependency Inversion** | Inject dependencies via constructors (page fixture, API client, config), not `new` them |

**Example:**
```typescript
// Bad (violates multiple SOLID principles)
const page = new Page();  // Tight coupling
page.login('user@test.com', 'pass');

// Good (SOLID compliant)
constructor(private page: Page, private loginPage: LoginPage) {}
this.loginPage.login('user@test.com', 'pass');  // Dependency injection
```

---

### **3. Object-Oriented Programming (OOP)**

**Implemented via:**

- **Inheritance:** BasePage → specific pages; BaseAPIClient → service clients
- **Encapsulation:** Private/protected locators; public business methods
- **Polymorphism:** Multiple API clients implement common interface
- **Abstraction:** Interfaces define contracts; implementations vary

**Class Hierarchy:**
```
Page (Playwright fixture)
  └─ BasePage (Abstract)
      ├─ LoginPage
      ├─ DashboardPage
      └─ [FeaturePage]

APIRequestContext (Playwright fixture)
  └─ BaseAPIClient (Abstract)
      ├─ UserAPIClient
      ├─ OrderAPIClient
      └─ [ServiceClient]

Page, APIRequestContext are dependency injected, not instantiated
```

---

### **4. Multi-Environment Support**

**Configuration Hierarchy:**

```
.env.dev         (Development)
.env.staging     (Staging)
.env.production  (Production)
     ↓
environment.config.ts (Loads env variables)
     ↓
playwright.config.ts (Applies configuration)
     ↓
Tests run against selected environment
```

**How it works:**

```bash
# Run against dev
npm run test:dev

# Run against staging
npm run test:staging

# Run against production (restricted)
npm run test:prod
```

**Environment-specific settings:**
- Base URLs
- API endpoints
- Credentials (from GitHub Secrets/Jenkins Credentials)
- Browser settings
- Timeouts
- Test data sources

---

### **5. Multi-Browser Support**

**Supported Browsers:**
- Chromium (default)
- Firefox
- WebKit (Safari)

**Configuration:**
```bash
# Select browser via environment variable
BROWSER=chromium    # npx playwright test
BROWSER=firefox     # npx playwright test --project=firefox
BROWSER=webkit      # npx playwright test --project=webkit
```

**BrowserHelper manages:**
- Browser launch with options
- Context creation (isolated state per test)
- Page navigation & interactions
- Browser/context cleanup

**Parallel execution:**
- Each test gets isolated browser context
- No shared state between tests
- Configurable workers (4 default, 1 in CI)

---

### **6. Page Object Model Example**

**File:** `src/pages/LoginPage.ts`

```typescript
// Structure (conceptual, not actual code):

export class LoginPage extends BasePage {
  // Private locators
  private emailInput = 'input[type="email"]'
  private passwordInput = 'input[type="password"]'
  private submitButton = 'button[type="submit"]'
  private errorMessage = '.error-toast'

  // Public business methods
  async login(email: string, password: string) {
    await this.fill(this.emailInput, email)
    await this.fill(this.passwordInput, password)
    await this.click(this.submitButton)
    await this.waitForNavigation()
  }

  async getErrorMessage() {
    return this.getText(this.errorMessage)
  }

  async isLoginButtonVisible() {
    return this.isVisible(this.submitButton)
  }
}
```

**Usage in tests:**
```typescript
test('User can login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.login('user@test.com', 'password123')
  // Assert user is logged in
})
```

---

### **7. API Testing**

**BaseAPIClient Structure:**

```
BaseAPIClient (Abstract)
  ├─ Methods: get(), post(), put(), delete(), patch()
  ├─ Header management (auth tokens, content-type)
  ├─ Error handling & retries
  ├─ Response logging
  └─ Schema validation integration

UserAPIClient extends BaseAPIClient
  ├─ listUsers()
  ├─ createUser(payload)
  ├─ getUser(id)
  ├─ updateUser(id, payload)
  └─ deleteUser(id)
```

**Endpoints Configuration (YAML):**

**File:** `src/api/endpoints.yaml`

```yaml
api:
  users:
    list: GET /v1/users
    create: POST /v1/users
    get: GET /v1/users/{id}
    update: PUT /v1/users/{id}
    delete: DELETE /v1/users/{id}
  
  orders:
    list: GET /v1/orders
    create: POST /v1/orders
    get: GET /v1/orders/{id}
```

**Usage:**
```typescript
// Loaded automatically in BaseAPIClient
const usersClient = new UserAPIClient(context)
const users = await usersClient.listUsers()
const newUser = await usersClient.createUser(payload)
```

---

### **8. Test Data & Factories (FactoryBot Pattern)**

**File:** `src/fixtures/factories/UserFactory.ts`

```typescript
// Conceptual structure:

export class UserFactory {
  // Default attributes
  private static defaults = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@test.com',
    role: 'user'
  }

  // Build object (no persistence)
  static build(overrides?: Partial<User>): User {
    return { ...this.defaults, ...overrides }
  }

  // Create via API (with persistence)
  static async create(
    apiClient: UserAPIClient,
    overrides?: Partial<User>
  ): Promise<User> {
    const user = this.build(overrides)
    return apiClient.createUser(user)
  }

  // Batch creation for data setup
  static async createMany(
    apiClient: UserAPIClient,
    count: number
  ): Promise<User[]> {
    return Promise.all(
      Array.from({ length: count }, (_, i) =>
        this.create(apiClient, { email: `user${i}@test.com` })
      )
    )
  }
}
```

**Usage:**

```typescript
test.beforeEach(async ({ page, context }) => {
  // Setup: Create test user
  const testUser = await UserFactory.create(userClient, {
    email: 'unique@test.com'
  })
})

test('User can update profile', async ({ page }) => {
  // Arrange: Use factory-created data
  const user = UserFactory.build({ role: 'admin' })
  
  // Act & Assert
})
```

**Benefits:**
- Reusable test data
- Easy to override defaults
- Supports sequences (auto-incrementing IDs)
- Clean test setup
- Single source of truth for data

---

### **9. API Response Schema Validation**

**File:** `src/schemas/UserSchema.ts`

```typescript
// Conceptual structure using Joi or Zod:

export const UserSchema = {
  id: 'number',
  firstName: 'string',
  lastName: 'string',
  email: 'string (email)',
  createdAt: 'date',
  role: 'enum(user, admin, moderator)'
}

// Or using Joi:
export const userSchema = joi.object({
  id: joi.number().required(),
  email: joi.string().email().required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  createdAt: joi.date().required()
})
```

**Usage in tests:**

```typescript
test('API returns valid user schema', async ({ context }) => {
  const userClient = new UserAPIClient(context)
  const user = await userClient.getUser(1)
  
  // Validate response against schema
  expect(user).toMatchSchema(UserSchema)
})
```

**Benefits:**
- Catch API contract breaks
- Type safety across API layers
- Reusable validation
- Clear API expectations

---

### **10. Test Organization & Tagging**

**Test tags for filtering:**

```typescript
// Smoke tests (critical path, fast)
test.describe('@smoke Login', () => {
  test('User can login', async () => { ... })
})

// Regression tests (comprehensive coverage)
test.describe('@regression Dashboard', () => {
  test('User sees correct widgets', async () => { ... })
})

// API tests
test.describe('@api Users', () => {
  test('POST /users creates user', async () => { ... })
})
```

**Run specific tags:**
```bash
npm run test:smoke      # Only @smoke tests
npm run test:regression # Only @regression tests
npm run test:api        # Only @api tests
npm run test:all        # All tests
```

---

### **11. Parallel Execution**

**How it works:**

```
Playwright automatically:
├─ Creates N workers (default 4)
├─ Distributes tests across workers
├─ Each worker runs in isolated browser context
├─ No shared state between workers
└─ Reports results once all complete
```

**Configuration in `playwright.config.ts`:**
```typescript
// Conceptual:
{
  workers: process.env.CI ? 1 : 4,  // 1 in CI, 4 locally
  fullyParallel: true,               // Don't wait for serial tests
  timeout: 30000,                    // Global timeout
  expect: { timeout: 5000 }          // Assertion timeout
}
```

**Serial tests (when needed):**
```typescript
test.describe.serial('Multi-step flow', () => {
  test('Step 1: Create account', async () => { ... })
  test('Step 2: Verify email', async () => { ... })  // Runs after step 1
  test('Step 3: Onboarding', async () => { ... })   // Runs after step 2
})
```

**Expected performance:**
- With 4 workers: 10 smoke tests in ~5-10 minutes
- With 1 worker (CI): Same tests in ~20-30 minutes

---

### **12. Reporting**

**Report Types:**

| Report | Format | Best For | Access |
|--------|--------|----------|--------|
| **Playwright HTML** | Interactive HTML | Quick debugging | `npx playwright show-report` |
| **Allure Reports** | Enhanced graphs/trends | Stakeholder visibility | Jenkins/GitHub Pages |
| **JSON** | Machine-readable | CI/CD integration | Custom tools |
| **JUnit XML** | Standard format | Jenkins/GitHub integration | Artifacts |

**Automatic artifacts on failure:**
- Screenshots (PNG)
- Videos (WebM)
- Browser logs (TXT)
- Network logs (JSON)

**Features:**
- Timeline view of test execution
- Failed test screenshots
- Console logs & errors
- Network activity
- Trend graphs (with Allure)

---

### **13. Docker Support**

**Run tests in Docker container:**

```bash
# Build Docker image
docker build -t playwright-tests:latest .

# Run tests in container
docker run --rm playwright-tests:latest npm run test:smoke

# Run with specific environment
docker run --rm \
  -e ENVIRONMENT=staging \
  -e BASE_URL=https://staging.app.com \
  playwright-tests:latest npm run test:smoke
```

**Benefits:**
- Consistent environment (same across machines)
- Browsers pre-installed
- No local setup needed
- Production-like testing

**Dockerfile includes:**
- Playwright base image (browsers pre-installed)
- Node.js & npm
- Test dependencies
- Report generation tools

---

### **14. GitHub Actions CI/CD**

**Workflow:** `.github/workflows/smoke-tests.yml`

**Triggers:**
- ✅ Every push to any branch (smoke tests)
- ✅ Pull request to main (full validation)
- ✅ Manual trigger (workflow_dispatch)
- ✅ Scheduled nightly run (optional)

**What happens:**
```
Push to branch
  ↓
GitHub Actions triggered
  ↓
Checkout code
  ↓
Setup Node & dependencies
  ↓
Run smoke tests (4 parallel workers)
  ↓
Generate HTML report
  ↓
Upload artifacts (screenshots, videos)
  ↓
Post status on PR/commit
  ↓
(Block merge if tests fail)
```

**Expected time:** 5-10 minutes per run

**Status checks:**
- ✅ Visible on PR as status check
- ❌ Blocks merge if tests fail
- 📊 Artifacts available for download

---

### **15. Jenkins CI/CD**

**Pipeline:** `Jenkinsfile`

**Triggers:**
- ✅ GitHub webhook (push/PR)
- ✅ Scheduled jobs (cron)
- ✅ Manual trigger
- ✅ Post-merge deployment pipeline

**What happens:**
```
GitHub push → Jenkins webhook
  ↓
Jenkins job triggered
  ↓
Docker agent created
  ↓
Checkout code
  ↓
Setup & install dependencies
  ↓
Run smoke tests
  ↓
Generate reports (Allure + HTML)
  ↓
Archive artifacts
  ↓
Notify team (Slack/email)
  ↓
(Optional) Deploy to staging
```

**Features:**
- Parameterized builds (select environment)
- Parallel stages (UI tests + API tests)
- Artifact management (reports, screenshots, videos)
- Report trends (pass/fail graphs)
- Slack notifications on failure
- Integration with GitHub status checks

---

### **16. Logging & Debugging**

**Logger utility provides:**
- INFO: Test steps & actions
- DEBUG: Detailed execution info
- WARN: Potential issues
- ERROR: Failures & exceptions

**Enable debug logging:**
```bash
LOG_LEVEL=debug npm run test:smoke
```

**Generated log files:**
- `logs/test-execution.log`
- `logs/api-requests.log`
- `logs/browser-console.log`

**Screenshots & videos:**
- On failure: Automatic capture
- Per-test: Available in reports
- Stored in: `test-results/` directory

---

## **Running Tests**

### **Locally**

```bash
# All tests
npm run test

# Smoke tests (fastest feedback)
npm run test:smoke

# Specific test file
npm run test tests/ui/smoke/login.spec.ts

# Watch mode (re-run on file changes)
npm run test:watch

# Debug mode (open Playwright Inspector)
npm run test:debug

# UI mode (interactive test runner)
npm run test:ui
```

### **Against Different Environments**

```bash
# Dev environment
npm run test:dev

# Staging environment
npm run test:staging

# Production (use with caution)
npm run test:prod
```

### **In Docker**

```bash
# Build image
docker build -t playwright-tests:latest .

# Run smoke tests
docker run --rm playwright-tests:latest npm run test:smoke

# Run with custom environment
docker run --rm \
  -e ENVIRONMENT=staging \
  -e BASE_URL=https://staging.app.com \
  playwright-tests:latest npm run test:smoke

# Run with Docker Compose
docker-compose up --build
```

### **In Jenkins**

```groovy
// Jenkins reads Jenkinsfile automatically
// Triggers:
// 1. Push to any branch → GitHub webhook → Jenkins job
// 2. PR created → Jenkins runs tests before merge
// 3. Merge to main → Full test suite runs

// Manual trigger:
// Jenkins UI → Job → "Build with Parameters" → Select environment
```

### **In GitHub Actions**

```bash
# Automatic on push
git push origin feature-branch
# GitHub Actions runs tests automatically

# Manual trigger:
# GitHub UI → Actions → Workflow → "Run workflow"
```

---

## **Configuration Files**

### **playwright.config.ts**

Controls:
- Browser type & launch options
- Test timeout & retry behavior
- Parallelism (workers)
- Screenshot/video capture
- Report format & location
- Base URL for tests

---

### **smoke.config.ts**

Extends `playwright.config.ts` for smoke tests:
- Filters tests by `@smoke` tag
- Reduces workers (faster feedback)
- Shorter timeout values
- Minimal artifact capture (faster)

---

### **environment.config.ts**

Loads environment variables:
- Base URLs
- Credentials
- Browser settings
- Test data sources
- Logging configuration

---

### **.env files**

```
.env.dev        → Development configuration
.env.staging    → Staging configuration
.env.production → Production configuration (restricted)
```

**Never commit .env files!** Use `.gitignore`

---

## **Best Practices**

### **Test Development**

- ✅ Write tests against business requirements, not implementation
- ✅ One assertion per test (or related assertions)
- ✅ Use descriptive test names
- ✅ Keep tests independent (no inter-test dependencies)
- ✅ Use `@smoke` tag for critical path tests only
- ❌ Don't test framework features, test app features
- ❌ Don't use hardcoded wait times; use smart waits
- ❌ Don't share state between tests

### **Page Objects**

- ✅ Encapsulate locators (private/protected)
- ✅ Expose business methods (public)
- ✅ Reuse common actions in BasePage
- ✅ One page object per logical view
- ❌ Don't add test logic to page objects
- ❌ Don't create massive page objects; split into smaller ones

### **API Testing**

- ✅ Validate request payloads with factories
- ✅ Validate response schemas
- ✅ Test both happy path & error cases
- ✅ Use service clients (UserAPIClient, etc.)
- ❌ Don't hardcode API payloads in tests
- ❌ Don't skip schema validation

### **Maintainability**

- ✅ Use TypeScript strict mode (catch errors early)
- ✅ Follow naming conventions (PascalCase classes, camelCase methods)
- ✅ Keep selectors updated when UI changes
- ✅ Document complex test logic
- ✅ Review code before merging
- ❌ Don't use `any` types
- ❌ Don't have magic numbers/strings

### **CI/CD**

- ✅ Run smoke tests on every push
- ✅ Run full suite on PRs to main
- ✅ Keep smoke tests fast (<10 minutes)
- ✅ Monitor flaky tests
- ✅ Review test results after merge
- ❌ Don't ignore failed tests
- ❌ Don't commit broken tests

---

## **Troubleshooting**

### **Tests fail locally but pass in CI**

- Check environment variables (`.env` file)
- Verify test data exists
- Check for hardcoded URLs/credentials
- Review browser/OS differences
- Check network/proxy settings

### **Tests are flaky (pass sometimes, fail randomly)**

- Increase wait timeouts in flaky tests
- Use `waitFor()` instead of fixed sleeps
- Isolate tests (remove cross-test dependencies)
- Check for race conditions in async code
- Review screenshots in test reports

### **Docker build fails**

```bash
# Clean build (no cache)
docker build --no-cache -t playwright-tests:latest .

# Check Dockerfile syntax
docker build --help
```

### **GitHub Actions tests timeout**

- Reduce test suite size
- Increase parallelism (workers)
- Use smoke tests instead of full suite
- Check for hanging processes

### **Jenkins credential issues**

- Verify credentials added to Jenkins Credentials Store
- Check credential IDs in Jenkinsfile
- Ensure Jenkins has access to GitHub webhook
- Review Jenkins logs for auth errors

---

## **Contributing**

### **Adding a New Test**

1. Create test file: `tests/ui/[feature].spec.ts`
2. Create page object: `src/pages/[Feature]Page.ts`
3. Extend `BasePage` class
4. Add `@smoke` tag if critical path
5. Follow naming conventions
6. Run locally: `npm run test:[feature]`
7. Create PR; GitHub Actions runs tests automatically

### **Adding a New Page Object**

1. Create file: `src/pages/[Feature]Page.ts`
2. Extend `BasePage`
3. Define private locators
4. Expose public business methods
5. Add TypeScript types
6. Document complex logic

### **Adding a New API Client**

1. Create file: `src/api/[Service]APIClient.ts`
2. Extend `BaseAPIClient`
3. Add endpoints to `src/api/endpoints.yaml`
4. Implement service-specific methods
5. Add schema validation
6. Write API tests in `tests/api/[service].spec.ts`

### **Code Review Checklist**

- [ ] Tests pass locally
- [ ] Follows naming conventions
- [ ] No hardcoded values (use factories/config)
- [ ] Page objects encapsulate locators
- [ ] API tests validate responses
- [ ] No `any` types in TypeScript
- [ ] GitHub Actions workflow passes
- [ ] Artifact reports generated

---

## **Support & Documentation**

| Topic | Location |
|-------|----------|
| **Setup & Installation** | This README |
| **Architecture Deep Dive** | `docs/ARCHITECTURE.md` |
| **Page Object Examples** | `src/pages/` (existing pages) |
| **API Testing Guide** | `docs/API_TESTING.md` |
| **Test Data & Factories** | `docs/TEST_DATA.md` |
| **GitHub Actions Setup** | `.github/workflows/` & `docs/GITHUB_ACTIONS.md` |
| **Jenkins Setup** | `jenkins/docs/JENKINS_SETUP.md` |
| **Troubleshooting** | `docs/TROUBLESHOOTING.md` |
| **Best Practices** | `docs/BEST_PRACTICES.md` |

---

## **Quick Reference**

### **NPM Scripts**

```bash
npm run test              # Run all tests
npm run test:smoke       # Smoke tests only
npm run test:regression  # Regression tests only
npm run test:api         # API tests only
npm run test:dev         # Against dev environment
npm run test:staging     # Against staging environment
npm run test:watch       # Watch mode
npm run test:debug       # Debug mode
npm run test:ui          # Interactive UI mode
npm run report           # Show HTML report
npm run lint             # ESLint check
npm run format           # Auto-format code
npm run clean            # Clean artifacts
```

### **Environment Variables**

```bash
BASE_URL                 # Application URL
API_BASE_URL             # API endpoint
TEST_EMAIL               # Test user email
TEST_PASSWORD            # Test user password
BROWSER                  # chromium | firefox | webkit
HEADLESS                 # true | false
DEFAULT_TIMEOUT          # Timeout in milliseconds
LOG_LEVEL                # debug | info | warn | error
ENVIRONMENT              # dev | staging | production
CI                       # Set to true in CI/CD
```

### **Playwright Commands**

```bash
npx playwright test                    # Run tests
npx playwright test --headed           # Run in headed mode
npx playwright test --debug            # Debug mode
npx playwright test --ui               # Interactive UI
npx playwright show-report             # View HTML report
npx playwright install                 # Install browsers
npx playwright install --with-deps     # Install + system deps
```

---

## **Roadmap**

- [ ] Add mobile device testing
- [ ] Add visual regression testing
- [ ] Add performance testing
- [ ] Add accessibility testing (a11y)
- [ ] Add load testing (k6 integration)
- [ ] Add Allure TestOps integration
- [ ] Add custom report dashboards
- [ ] Add cross-browser testing (BrowserStack)

---

## **License**

This framework is proprietary. All rights reserved.

---

## **Contact & Support**

- 📧 Email: qa-team@yourcompany.com
- 💬 Slack: #qa-automation
- 🐛 Issues: [GitHub Issues](https://github.com/your-org/freshsales-playwright-ts/issues)
- 📚 Documentation: [Wiki](https://github.com/your-org/freshsales-playwright-ts/wiki)

---

**Happy Testing! 🚀**
import { test } from '../fixtures/test.fixtures'
import logger from '../../src/utils/logger'

// Global setup before all tests in the suite
test.beforeAll(async () => {
  logger.info('═══════════════════════════════════════════════════════════')
  logger.info('🚀 Test Suite Starting')
  logger.info('═══════════════════════════════════════════════════════════')

  logger.info(`Environment: ${process.env.ENVIRONMENT || 'dev'}`)
  logger.info(`Base URL: ${process.env.BASE_URL || 'http://localhost:3000'}`)
  logger.info(`API Base URL: ${process.env.API_BASE_URL || 'http://localhost:3000/api'}`)
  logger.info(`Log Level: ${process.env.LOG_LEVEL || 'info'}`)

  logger.info('═══════════════════════════════════════════════════════════')
})

// Setup before each individual test
test.beforeEach(async ({ page }, testInfo) => {
  logger.info('───────────────────────────────────────────────────────────')
  logger.info(`👉 [Test ${testInfo.testId}] ${testInfo.title}`)
  logger.info(`File: ${testInfo.file}`)
  logger.info(`Line: ${testInfo.line}`)
  logger.info('───────────────────────────────────────────────────────────')

  // Set up page event listeners
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      logger.warn(`Browser Console Error: ${msg.text()}`)
    }
  })

  page.on('pageerror', (error) => {
    logger.error(`Page Error: ${error.message}`)
  })

  page.on('requestfailed', (request) => {
    logger.warn(`Request Failed: ${request.url()}`)
  })
})

// Cleanup after each individual test
test.afterEach(async ({ page }, testInfo) => {
  logger.info('───────────────────────────────────────────────────────────')

  if (testInfo.status === 'passed') {
    logger.info(`✅ [Test ${testInfo.testId}] PASSED`)
  } else if (testInfo.status === 'failed') {
    logger.error(`❌ [Test ${testInfo.testId}] FAILED`)
    logger.error(`Error: ${testInfo.error?.message || 'Unknown error'}`)

    // Take screenshot on failure
    const screenshotPath = `test-results/screenshots/${testInfo.testId}-failure.png`
    logger.info(`Taking screenshot: ${screenshotPath}`)
    await page.screenshot({ path: screenshotPath }).catch(() => {
      logger.warn('Could not take screenshot')
    })

    // Collect page content on failure
    logger.info('Collecting page state for debugging')
    const pageTitle = await page.title().catch(() => 'Unknown')
    const pageUrl = page.url()
    logger.error(`Page Title: ${pageTitle}`)
    logger.error(`Page URL: ${pageUrl}`)
  } else if (testInfo.status === 'skipped') {
    logger.info(`⊘ [Test ${testInfo.testId}] SKIPPED`)
  }

  // Log test duration
  const duration = testInfo.duration
  logger.info(`Duration: ${duration}ms`)

  // Clear page state
  logger.info('Clearing page cookies and storage')
  await page.context().clearCookies().catch(() => {})
  await page.evaluate(() => window.localStorage.clear()).catch(() => {})

  logger.info('───────────────────────────────────────────────────────────')
})

// Global cleanup after all tests in the suite
test.afterAll(async () => {
  logger.info('═══════════════════════════════════════════════════════════')
  logger.info('✅ Test Suite Completed')
  logger.info('═══════════════════════════════════════════════════════════')

  logger.info('Generating test summary...')
  logger.info('All test cleanup tasks completed')

  logger.info('═══════════════════════════════════════════════════════════')
})

// Hook for handling worker process start
test.describe.configure({ mode: 'parallel' })

logger.info('Test hooks registered successfully')

import { test as base, Page, expect } from '@playwright/test'
import logger from '../../src/utils/logger'

// Generic fixture types - extend in app-specific fixture files
export type TestFixtures = Record<string, never>

// Base test with generic fixtures
export const test = base.extend<TestFixtures>({
  // Fixture 1: Authenticated page context (Generic)
  authenticatedPage: async ({ page }, use) => {
    logger.info('Setting up authenticatedPage fixture')

    try {
      const baseUrl = process.env.BASE_URL || 'http://localhost:3000'

      logger.info(`Navigating to login page: ${baseUrl}/login`)
      await page.goto(`${baseUrl}/login`)

      // Generic selectors for login form - override in app-specific fixtures if needed
      const emailInput = page.locator('input[type="email"], input[name="email"]')
      const passwordInput = page.locator('input[type="password"], input[name="password"]')
      const submitButton = page.locator('button[type="submit"]')

      logger.info('Filling login credentials')
      const email = process.env.TEST_EMAIL || 'test@example.com'
      const password = process.env.TEST_PASSWORD || 'password'

      await emailInput.fill(email)
      await passwordInput.fill(password)

      logger.info('Submitting login form')
      await submitButton.click()

      logger.info('Waiting for dashboard navigation')
      await page.waitForURL(/dashboard|home/, { timeout: 10000 })

      logger.info('authenticatedPage fixture setup complete')
      await use(page)

      // Logout cleanup
      logger.info('Cleaning up authenticatedPage fixture - logging out')
      const logoutButton = page.locator('[data-testid="logout-button"], .logout-btn, [aria-label="Logout"]')

      if (await logoutButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await logoutButton.click()
        await page.waitForURL(/login/, { timeout: 5000 }).catch(() => {})
      }

      logger.info('authenticatedPage fixture cleanup complete')
    } catch (error) {
      logger.error(`Error in authenticatedPage fixture: ${error instanceof Error ? error.message : String(error)}`)
      throw error
    }
  }
})

// Export expect for use in tests
export { expect }


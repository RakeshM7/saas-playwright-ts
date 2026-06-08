import { Page } from '@playwright/test'
import logger from '../utils/logger'
import { BaseHelper } from './BaseHelper'
import timeouts from '../config/timeout.config'

export class WaitHelper {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async waitForElement(selector: string, timeout?: number): Promise<void> {
    logger.info(`Waiting for element: ${selector}`)
    await BaseHelper.waitUntil(
        async () => {
            return await this.page.locator(selector).isVisible()
        },
        timeout || timeouts.ASSERTION
    )
  }

  async waitForElementToDisappear(selector: string, timeout?: number): Promise<void> {
    logger.info(`Waiting for element to disappear: ${selector}`)
    await BaseHelper.waitUntil(
        async () => {
            return !(await this.page.locator(selector).isVisible())
        },
        timeout || timeouts.ASSERTION
    )
  }

  async waitForElementToBeClickable(selector: string, timeout?: number): Promise<void> {
    logger.info(`Waiting for element to be clickable: ${selector}`)

    await BaseHelper.waitUntil(
        async () => {
            const isVisible = await this.page.locator(selector).isVisible()
            const isEnabled = await this.page.locator(selector).isEnabled()
            return isVisible && isEnabled
        },
        timeout || timeouts.ASSERTION
    ) 
  }

  async waitForText(text: string, timeout?: number): Promise<void> {
    logger.info(`Waiting for text: ${text}`)
    await BaseHelper.waitUntil(
        async () => {
            return await this.page.getByText(text).isVisible()
        },
        timeout || timeouts.ASSERTION
    )
  }

  async waitForURL(urlPattern: string | RegExp, timeout?: number): Promise<void> {
    logger.info(`Waiting for URL: ${urlPattern}`)
    await BaseHelper.waitUntil(
        async () => {
            const currentUrl = this.page.url()

            if (urlPattern instanceof RegExp){
                return urlPattern.test(currentUrl)
            }

            return currentUrl.includes(urlPattern)
        },
        timeout || timeouts.ASSERTION
    )
  }
}
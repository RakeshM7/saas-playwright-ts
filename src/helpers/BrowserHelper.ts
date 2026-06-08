import logger from '../utils/logger'
import { Page } from '@playwright/test'

export class BrowserHelper {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async takeScreenshot(filename?: string): Promise<void> {
    logger.info('Taking screenshot...')
    await this.page.screenshot({ path: filename })
    logger.info('Screenshot captured successfully')
  }

  async getCurrentPageTitle(): Promise<string> {
    logger.info('Getting current page title...')
    const title = await this.page.title()
    logger.info(`Current page title: ${title}`)
    return title
  }

  async getCurrentURL(): Promise<string> {
    logger.info('Getting current URL...')
    const url = this.page.url()
    logger.info(`Current URL: ${url}`)
    return url
  }

  async goBack(): Promise<void> {
    logger.info('Navigating back...')
    await this.page.goBack()
    logger.info('Successfully navigated back')
  }

  async goForward(): Promise<void> {
    logger.info('Navigating forward...')
    await this.page.goForward()
    logger.info('Successfully navigated forward')
  }
}
import {Page, Locator} from '@playwright/test'
import logger from "../utils/logger"
import timeouts from "../config/timeout.config"

export class BasePage{
    protected page: Page
    
    constructor(page: Page) {
        this.page = page
    }

    async navigateTo(url: string){
        logger.info(`Navigating to URL: ${url}`)
        await this.page.goto(url, {waitUntil: 'networkidle'})
    }

    async click(locator: Locator) {
        logger.info('Clicked element')
        await locator.click()
    }

    async fill(locator: Locator, text: string) {
        logger.info(`Filled field with text: ${text}`)
        await locator.fill(text)
    }

    async isVisible(locator: Locator): Promise<boolean> {
        return await this.page.locator(locator).isVisible()
    }

    async waitForSelector(locator: Locator, timeout?: number) {
        await this.page.locator(locator).waitFor({ timeout: timeout || timeouts.ASSERTION })
    }

    async getText(locator: Locator): Promise<string> {
        return await locator.textContent() || '';
    }

    async waitForElement(locator: Locator, timeout?: number) {
        await locator.waitFor({ timeout: timeout || timeouts.ASSERTION });
    }

    protected getPage(): Page {
        return this.page
    }
}
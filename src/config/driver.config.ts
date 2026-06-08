/*
    Imports
*/

import config from "./environment.config";
import timeouts from './timeout.config';

import { LaunchOptions, BrowserContextOptions } from '@playwright/test';

/**
 * Browser and driver configuration for Playwright.
 * Controls browser launch options, context settings, and viewport.
 */

const getBrowserArgs = (): string[] => {
    return [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--no-sandbox",
        "--disable-extensions"
    ]
}

const setSlowMo = (): number => {
    return config.logLevel == 'debug' ? 500 : 0
}

const launchOptions: LaunchOptions = {
    headless: config.headless,
    slowMo: setSlowMo(),
    args: getBrowserArgs()
}

const contextOptions: BrowserContextOptions = {
    viewport: {
        width: 1280,
        height: 720
    },
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    locale: 'en-US',
    timezone: 'UTC'
}

const navigationTimeout: number = timeouts.NAVIGATION


const driverConfig = {
    launchOptions,
    contextOptions,
    navigationTimeout
} as const

export default driverConfig
export type {LaunchOptions, BrowserContextOptions}
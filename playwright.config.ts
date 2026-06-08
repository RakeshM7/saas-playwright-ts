// Import defineConfig from Playwright
// Import path module from Node.js
// Add a comment at the top: 
// "Main Playwright configuration file.
// Configures browsers, timeouts, reporters, and artifact capture."

import {defineConfig} from '@playwright/test';

/**
 * Main Playwright configuration file.
 * Configures browsers, timeouts, reporters, and artifact capture.
 */

/**
 * Detect where the tests are running
*/
const isGitHubActions = !!process.env.GITHUB_ACTIONS
const isJenkins = !!process.env.JENKINS_HOME
const isLocal = !isGitHubActions && !isJenkins


// GET environment - dev/staging/production
const environment = process.env.ENVIRONMENT || 'dev'
const baseUrlMap: Record<string, string> = {
    dev: "https://rakesh-freshsales-ind.myfreshworks.com/crm/sales",
    staging: "https://rakesh-freshsales-ind.myfreshworks.com/crm/sales",
    production: "https://rakesh-freshsales-ind.myfreshworks.com/crm/sales"
}

// Get number of workers from env, default to 4
const workers = parseInt(process.env.WORKERS || '4', 10)
const baseUrl = baseUrlMap[environment]

// Set reporters based on the environment in which the test is running

const reporters: Array<[string, object]> = [
    ['html', {open: 'never'}] // Always include HTML reporter
]

// Add Allure reporter for Jenkins and local runs

if(isJenkins || isLocal){
    reporters.push(['allure-playwright', {}])
}


export default defineConfig(
    {
        // Test discovery
        testDir: './tests',
        testMatch: '**/*.spec.ts',

        //Execution settings
        timeout: 30000,             // 30 seconds per test
        expect: {timeout: 5000},    // timeout per assertion
        fullyParallel: true,        // run all tests in parallel
        workers: workers,
        retries: 0,                 //Global retries not configured, set them at test-level

        //Artifacts [Screenshots, videos, traces]
        use: {
            baseUrl: baseUrl,
            screenshot: 'only-on-failure',
            video: 'retain-on-failure',
            trace: 'on-first-retry'
        },

        // Reporters
        reporter: reporters,
    }
)


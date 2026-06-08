import dotenv from 'dotenv'

/*
Load and validate environment variables from .env files.
Provides type-safe, centralized access to configuration.
*/

/*

Get ENVIRONMENT variable from process.env (default: 'dev')
Construct .env file path: `.env.${environment}`
Use dotenv.config() to load that specific file
Log a message showing which file was loaded (no secrets shown)

*/

const env = process.env.ENVIRONMENT || 'dev'
const envFile = `.env.${env}`
dotenv.config({ path: envFile })


interface EnvironmentConfig{
    // Required (no defaults)
    baseUrl: string
    apiBaseUrl: string
    testEmail: string
    testPassword: string
    testApiKey: string

    // Optional (have defaults)
    browser: 'chromium' | 'firefox' | 'webkit'
    headless: boolean
    defaultTimeout: number
    waitTimeout: number
    logLevel: 'debug' | 'info' | 'warn' | 'error'
    environment: string
    ci: boolean
    workers: number
    smokeWorkers: number
}

const getRequired = (key: string): string => {
    const value = process.env[key]
    if (!value) throw new Error(`${key} is required`)
    return value
}

/*

Helper function: getEnvVariable(key: string, defaultValue?: string)
  - Get value from process.env[key]
  - Return defaultValue if not present
  - Handle type conversion (string → boolean, string → number)

  */

const config: EnvironmentConfig = {
    // Required fields
    baseUrl: getRequired('BASE_URL'),
    apiBaseUrl: getRequired('API_BASE_URL'),
    testEmail: getRequired('TEST_EMAIL'),
    testPassword: getRequired('TEST_PASSWORD'),
    testApiKey: getRequired('TEST_API_KEY'),

    // Optional fields with defaults
    browser: (process.env.BROWSER || 'chromium') as 'chromium' | 'firefox' | 'webkit',
    headless: process.env.HEADLESS !== 'false',
    defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT || '30000', 10),
    waitTimeout: parseInt(process.env.WAIT_TIMEOUT || '5000', 10),
    logLevel: (process.env.LOG_LEVEL || 'info') as 'debug' | 'info' | 'warn' | 'error',
    environment: process.env.ENVIRONMENT || 'dev',
    ci: process.env.CI === 'true',
    workers: parseInt(process.env.WORKERS || '4', 10),
    smokeWorkers: parseInt(process.env.SMOKE_WORKERS || '1', 10),
} as const  // Makes it readonly

// Validation function
function validateConfig(config: EnvironmentConfig): void {
    const validBrowsers = ['chromium', 'firefox', 'webkit']
    const validLogLevels = ['debug', 'info', 'warn', 'error']
    
    if (!validBrowsers.includes(config.browser)) {
        throw new Error(`Invalid browser: ${config.browser}`)
    }
    if (!validLogLevels.includes(config.logLevel)) {
        throw new Error(`Invalid logLevel: ${config.logLevel}`)
    }
}

// Logging function
function logConfigOnStartup(config: EnvironmentConfig): void {
    if (config.logLevel === 'debug') {
        console.debug('Configuration loaded:', {
            environment: config.environment,
            browser: config.browser,
            headless: config.headless,
            workers: config.workers,
            smokeWorkers: config.smokeWorkers,
            // DO NOT log: testEmail, testPassword, testApiKey (secrets!)
        })
    }
}

// Validate and log
validateConfig(config)
logConfigOnStartup(config)


// Export
export default config
export type { EnvironmentConfig }
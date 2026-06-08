import { defineConfig, mergeTests } from '@playwright/test'
import baseConfig from './playwright.config'

/**
 * Smoke test optimized configuration.
 * Extends playwright.config.ts with smoke-specific overrides.
 * Runs only @smoke tagged tests with minimal workers for fast feedback.
 * Fast execution: 5-10 minutes vs 20-30 for full suite.
 */

// Get smoke-specific worker count from environment, default to 1
const smokeWorkers = parseInt(process.env.SMOKE_WORKERS || '1', 10)

// Smoke test configuration overrides (minimal - only changed settings)
const smokeConfig = defineConfig({
  grep: /@smoke/,           // Only run tests tagged with @smoke
  workers: smokeWorkers,    // Configurable, default 1 for fast feedback
  use: {
    video: 'off',           // No video recording (save storage and time)
    trace: 'off',           // No detailed traces (save storage and time)
  },
})

// Merge base configuration with smoke test overrides
export default mergeTests(baseConfig, smokeConfig)

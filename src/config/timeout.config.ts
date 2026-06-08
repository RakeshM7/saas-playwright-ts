import config from "./environment.config";

/**
 * Timeout configuration constants.
 * Defines all timeout values used throughout the framework.
 */

const ACTION_TIMEOUT = config.defaultTimeout
const NAVIGATION_TIMEOUT = Math.floor(config.defaultTimeout / 2)
const ASSERTION_TIMEOUT = 5000
const SHORT_TIMEOUT =  1000
const LONG_TIMEOUT = 60000



export const timeouts = {
    ACTION: ACTION_TIMEOUT,
    NAVIGATION: NAVIGATION_TIMEOUT,
    ASSERTION: ASSERTION_TIMEOUT,
    SHORT: SHORT_TIMEOUT,
    LONG: LONG_TIMEOUT
} as const

export default timeouts
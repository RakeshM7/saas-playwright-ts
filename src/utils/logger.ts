import config from "../config/environment.config";

/**
 * Logger utility class.
 * Provides logging at different levels: debug, info, warn, error.
 * Respects LOG_LEVEL setting from environment config.
 */

class Logger {
    // Helper method: Check if a log level should be shown
    private shouldLog(level: 'debug' | 'info' | 'warn' | 'error'): boolean {
        const levels = {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3
        }

        const currentLevel = levels[config.logLevel as keyof typeof levels];
        return levels[level] >= currentLevel
    }
    
    // Helper method : to get current timestamp
    private getTimestamp(): string {
        return new Date().toISOString()
    }

    // Format log message with timestamp and level
    private formatMessage(level: string, message: string): string {
        return `[${this.getTimestamp()}] [${level.toUpperCase()}] ${message}`
    }

    debug(message: string): void {
        if (this.shouldLog('debug')) {
            console.debug(this.formatMessage('debug', message))
        }
    }

    warn(message: string): void {
        if (this.shouldLog('warn')) {
            console.warn(this.formatMessage('warn', message))
        }
    }

    info(message: string): void {
        if (this.shouldLog('info')) {
            console.info(this.formatMessage('info', message))
        }
    }

    error(message: string): void {
        if (this.shouldLog('error')) {
            console.error(this.formatMessage('error', message))
        }
    }
}

const logger = new Logger()

export default logger
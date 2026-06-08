import logger from "../utils/logger";
import { faker } from '@faker-js/faker'

export class BaseHelper{
    static async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    static generateRandomString(length: number = 10): string {
        return faker.string.alphaNumeric(length)
    }

    static generateRandomEmail(): string {
        return faker.internet.email()
    }

    static parseJSON(jsonString: string): any | null {
        try {
            return JSON.parse(jsonString)
        } catch (error) {
            logger.error(`Failed to parse JSON: ${error}`)
            return null
        }
    }

    static async retryAsync<T>(
        fn: () => Promise<T>,
        maxAttempts: number = 3,
        delayMs: number = 500
    ): Promise<T> {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                const result = await fn()
                return result
            } catch (error) {
                logger.warn(`Attempt ${attempt} failed, retrying...`)

                if (attempt === maxAttempts) {
                    throw error
                }

                await this.delay(delayMs)
            }
        }

        throw new Error('Retry logic failed')
    }

    static async waitUntil(
        condition: () => Promise<boolean>,
        timeoutMs: number = 5000,
        intervalMs: number = 500
    ): Promise<void> {
        const endTime = Date.now() + timeoutMs
        while(Date.now() < endTime){
            const result = await condition()
            if(result === true){
                return
            }
            else{
                await this.delay(intervalMs)
            }
        }

        throw new Error("Timeout waiting for condition")
    }
}
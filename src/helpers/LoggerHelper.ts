import logger from '../utils/logger'

export class LoggerHelper {
  static logTestStart(testName: string): void {
    const separator = '═'.repeat(50)
    logger.info(`${separator}`)
    logger.info(`🧪 TEST START: ${testName}`)
    logger.info(`${separator}`)
  }

  static logTestEnd(testName: string, status: 'PASSED' | 'FAILED'): void {
    const separator = '═'.repeat(50)
    const emoji = status === 'PASSED' ? '✅' : '❌'
    logger.info(`${separator}`)
    logger.info(`${emoji} TEST ${status}: ${testName}`)
    logger.info(`${separator}`)
  }

  static logSection(sectionName: string): void {
    const separator = '─'.repeat(50)
    logger.info(`${separator}`)
    logger.info(`📍 SECTION: ${sectionName}`)
    logger.info(`${separator}`)
  }

  static logStep(stepNumber: number, stepDescription: string): void {
    logger.info(`👉 [Step ${stepNumber}] ${stepDescription}`)
  }

  static logData(label: string, data: any): void {
    logger.info(`📊 ${label}:`)
    logger.info(JSON.stringify(data, null, 2))
  }
}

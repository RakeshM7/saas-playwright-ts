import { APIRequestContext } from '@playwright/test'
import logger from '../utils/logger'
import config from '../config/environment.config'

interface APIResponse {
  status: number
  body: any
  headers: any
}

export abstract class BaseAPIClient {
  protected baseURL: string
  protected apiRequest: APIRequestContext
  protected headers: Record<string, string>

  constructor(baseURL: string, apiRequest: APIRequestContext) {
    this.baseURL = baseURL
    this.apiRequest = apiRequest
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Token token=${config.testApiKey}`
    }
  }

  async get(endpoint: string, options?: object): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`
    logger.info(`[GET] ${url}`)

    const response = await this.apiRequest.get(url, {
      headers: this.headers,
      ...options
    })

    return {
      status: response.status(),
      body: await response.json(),
      headers: response.headers()
    }
  }

  async post(endpoint: string, data?: object, options?: object): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`
    logger.info(`[POST] ${url}`)

    const response = await this.apiRequest.post(url, {
      headers: this.headers,
      data: data,
      ...options
    })

    return {
      status: response.status(),
      body: await response.json(),
      headers: response.headers()
    }
  }

  async put(endpoint: string, data?: object, options?: object): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`
    logger.info(`[PUT] ${url}`)

    const response = await this.apiRequest.put(url, {
      headers: this.headers,
      data: data,
      ...options
    })

    return {
      status: response.status(),
      body: await response.json(),
      headers: response.headers()
    }
  }

  async patch(endpoint: string, data?: object, options?: object): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`
    logger.info(`[PATCH] ${url}`)

    const response = await this.apiRequest.patch(url, {
      headers: this.headers,
      data: data,
      ...options
    })

    return {
      status: response.status(),
      body: await response.json(),
      headers: response.headers()
    }
  }

  async delete(endpoint: string, options?: object): Promise<APIResponse> {
    const url = `${this.baseURL}${endpoint}`
    logger.info(`[DELETE] ${url}`)

    const response = await this.apiRequest.delete(url, {
      headers: this.headers,
      ...options
    })

    return {
      status: response.status(),
      body: await response.json(),
      headers: response.headers()
    }
  }
}

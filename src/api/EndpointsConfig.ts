import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'
import logger from '../utils/logger'

interface Endpoints {
    [service: string]: {
        [endpoint: string]: string
    }
}


export class EndpointsConfig {
    private endpoints: Endpoints
    private filePath: string

    constructor(){
        this.filePath = path.join(__dirname, 'endpoints.yaml')
        this.endpoints = this.loadYAML()
        logger.info('Endpoints loaded successfully')
    }

    private loadYAML(): Endpoints {
        try {
            const content = fs.readFileSync(this.filePath, 'utf-8')
            const data = yaml.load(content) as any
            return data.endpoints || {}
        } catch (error) {
            logger.error(`Failed to load endpoints.yaml: ${error}`)
            throw error
        }
    }

    getEndpoint(service: string, endpoint: string): string {
        if (!this.endpoints[service]) {
            throw new Error(`Service '${service}' not found in endpoints`)
        }
        
        if (!this.endpoints[service][endpoint]) {
            throw new Error(`Endpoint '${endpoint}' not found in service '${service}'`)
        }
        
        return this.endpoints[service][endpoint]
    }

    // In EndpointsConfig.ts
    getEndpointByPath(dotPath: string): string {
        // Example: 'users.profile.settings.security'
        const keys = dotPath.split('.')
        let value: any = this.getAll()
        
        for (const key of keys) {
            value = value[key]
            if (!value) {
                throw new Error(`Path '${dotPath}' not found`)
            }
        }
     
        return value
    }


    getAll(): Endpoints {
        return this.endpoints
    }

}
import axios, { AxiosInstance } from 'axios'
import { ZendeskConfig } from '../zendesk.types'

export function createHttpAgent(config: ZendeskConfig): AxiosInstance {
    const baseURL = `https://${config.subdomain}.zendesk.com/api/v2`
    const agent = axios.create({ baseURL })

    agent.interceptors.request.use((req) => {
        const credentials = Buffer.from(`${config.username}:${config.password}`).toString('base64')
        req.headers['Authorization'] = `Basic ${credentials}`
        req.headers['Content-Type'] = 'application/json'
        req.headers['Accept'] = 'application/json'
        return req
    })

    return agent
}

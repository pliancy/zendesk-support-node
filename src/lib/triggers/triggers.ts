import { AxiosInstance } from 'axios'
import { Trigger } from './triggers.types'

export class Triggers {
    private readonly baseUrl = '/triggers'

    constructor(private readonly http: AxiosInstance) {}

    async list(): Promise<Trigger[]> {
        type Page = { triggers: Trigger[]; next_page: string | null }
        const results: Trigger[] = []
        let nextPage: string | null = `${this.baseUrl}.json`

        while (nextPage !== null) {
            const page: Page = (await this.http.get<Page>(nextPage)).data
            results.push(...page.triggers)
            nextPage = page.next_page
        }

        return results
    }

    async create(trigger: Trigger): Promise<Trigger> {
        const { data } = await this.http.post<{ trigger: Trigger }>(`${this.baseUrl}.json`, { trigger })
        return data.trigger
    }

    async update(triggerId: number, trigger: Trigger): Promise<Trigger> {
        const { data } = await this.http.put<{ trigger: Trigger }>(
            `${this.baseUrl}/${triggerId}.json`,
            { trigger },
        )
        return data.trigger
    }

    async delete(triggerId: number): Promise<void> {
        await this.http.delete(`${this.baseUrl}/${triggerId}.json`)
    }
}

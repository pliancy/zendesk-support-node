import { AxiosInstance } from 'axios'
import { View } from './views.types'

export class Views {
    private readonly baseUrl = '/views'

    constructor(private readonly http: AxiosInstance) {}

    async list(): Promise<View[]> {
        type Page = { views: View[]; next_page: string | null }
        const results: View[] = []
        let nextPage: string | null = `${this.baseUrl}.json`

        while (nextPage !== null) {
            const page: Page = (await this.http.get<Page>(nextPage)).data
            results.push(...page.views)
            nextPage = page.next_page
        }

        return results
    }

    async create(view: View): Promise<View> {
        const { data } = await this.http.post<{ view: View }>(`${this.baseUrl}.json`, { view })
        return data.view
    }

    async update(viewId: number, view: View): Promise<View> {
        const { data } = await this.http.put<{ view: View }>(`${this.baseUrl}/${viewId}.json`, {
            view,
        })
        return data.view
    }

    async delete(viewId: number): Promise<void> {
        await this.http.delete(`${this.baseUrl}/${viewId}.json`)
    }
}

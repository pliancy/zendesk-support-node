import { AxiosInstance } from 'axios'
import { Group } from './groups.types'

export class Groups {
    private readonly baseUrl = '/groups'

    constructor(private readonly http: AxiosInstance) {}

    async list(groupId?: number, userId?: number): Promise<Group[]> {
        if (groupId !== undefined) {
            const { data } = await this.http.get<{ group: Group }>(
                `${this.baseUrl}/${groupId}.json`,
            )
            return [data.group]
        }

        type Page = { groups: Group[]; next_page: string | null }
        const results: Group[] = []
        let nextPage: string | null =
            userId !== undefined ? `/users/${userId}/groups.json` : `${this.baseUrl}.json`

        while (nextPage) {
            const page: Page = (await this.http.get<Page>(nextPage)).data
            results.push(...page.groups)
            nextPage = page.next_page
        }

        return results
    }

    async create(group: Group): Promise<Group> {
        const { data } = await this.http.post<{ group: Group }>(`${this.baseUrl}.json`, { group })
        return data.group
    }

    async update(groupId: number, group: Group): Promise<Group> {
        const { data } = await this.http.put<{ group: Group }>(`${this.baseUrl}/${groupId}.json`, {
            group,
        })
        return data.group
    }

    async delete(groupId: number): Promise<void> {
        await this.http.delete(`${this.baseUrl}/${groupId}.json`)
    }
}

import { AxiosInstance } from 'axios'
import { Organization } from './organizations.types'

export class Organizations {
    private readonly baseUrl = '/organizations'

    constructor(private readonly http: AxiosInstance) {}

    async list(): Promise<Organization[]> {
        type Page = { organizations: Organization[]; next_page: string | null }
        const results: Organization[] = []
        let nextPage: string | null = `${this.baseUrl}.json`

        while (nextPage) {
            const page: Page = (await this.http.get<Page>(nextPage)).data
            results.push(...page.organizations)
            nextPage = page.next_page
        }

        return results
    }

    async find(name: string): Promise<Organization[]> {
        const { data } = await this.http.get<{ organizations: Organization[] }>(
            `${this.baseUrl}/autocomplete.json`,
            { params: { name } },
        )
        return data.organizations
    }

    async create(organization: Organization): Promise<Organization> {
        const { data } = await this.http.post<{ organization: Organization }>(
            `${this.baseUrl}.json`,
            { organization },
        )
        return data.organization
    }

    async update(organizationId: number, organization: Organization): Promise<Organization> {
        const { data } = await this.http.put<{ organization: Organization }>(
            `${this.baseUrl}/${organizationId}.json`,
            { organization },
        )
        return data.organization
    }

    async upsert(organization: Organization): Promise<Organization> {
        const { data } = await this.http.post<{ organization: Organization }>(
            `${this.baseUrl}/create_or_update.json`,
            { organization },
        )
        return data.organization
    }

    async delete(organizationId: number): Promise<void> {
        await this.http.delete(`${this.baseUrl}/${organizationId}.json`)
    }
}

import { AxiosInstance } from 'axios'
import { OrganizationMembership } from './organization-memberships.types'

export class OrganizationMemberships {
    private readonly baseUrl = '/organization_memberships'

    constructor(private readonly http: AxiosInstance) {}

    async create(membership: OrganizationMembership): Promise<OrganizationMembership> {
        const { data } = await this.http.post<{ organization_membership: OrganizationMembership }>(
            `${this.baseUrl}.json`,
            { organization_membership: membership },
        )
        return data.organization_membership
    }

    async listByUser(userId: number): Promise<OrganizationMembership[]> {
        type Page = { organization_memberships: OrganizationMembership[]; next_page: string | null }
        const results: OrganizationMembership[] = []
        let nextPage: string | null = `/users/${userId}/organization_memberships.json`

        while (nextPage) {
            const page: Page = (await this.http.get<Page>(nextPage)).data
            results.push(...page.organization_memberships)
            nextPage = page.next_page
        }

        return results
    }

    async delete(membershipId: number): Promise<void> {
        await this.http.delete(`${this.baseUrl}/${membershipId}.json`)
    }
}

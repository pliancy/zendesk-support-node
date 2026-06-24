import { AxiosInstance } from 'axios'
import { GroupMembership } from './group-memberships.types'

export class GroupMemberships {
    constructor(private readonly http: AxiosInstance) {}

    async list(groupId?: number, userId?: number): Promise<GroupMembership[]> {
        type Page = { group_memberships: GroupMembership[]; next_page: string | null }
        const results: GroupMembership[] = []
        let nextPage: string | null =
            groupId !== undefined
                ? `/groups/${groupId}/memberships.json`
                : userId !== undefined
                  ? `/users/${userId}/group_memberships.json`
                  : `/group_memberships.json`

        while (nextPage) {
            const page: Page = (await this.http.get<Page>(nextPage)).data
            results.push(...page.group_memberships)
            nextPage = page.next_page
        }

        return results
    }

    async create(groupMembership: GroupMembership): Promise<GroupMembership> {
        const { data } = await this.http.post<{ group_membership: GroupMembership }>(
            `/group_memberships.json`,
            { group_membership: groupMembership },
        )
        return data.group_membership
    }

    async delete(groupMembershipId: number): Promise<void> {
        await this.http.delete(`/group_memberships/${groupMembershipId}.json`)
    }
}

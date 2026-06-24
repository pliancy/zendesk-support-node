import { AxiosInstance } from 'axios'
import { GroupMembership } from './group-memberships.types'

export class GroupMemberships {
    constructor(private readonly http: AxiosInstance) {}

    async list(groupId?: number, userId?: number): Promise<GroupMembership[]> {
        let url: string

        if (groupId !== undefined) {
            url = `/groups/${groupId}/memberships.json`
        } else if (userId !== undefined) {
            url = `/users/${userId}/group_memberships.json`
        } else {
            url = `/group_memberships.json`
        }

        const { data } = await this.http.get<{ group_memberships: GroupMembership[] }>(url)
        return data.group_memberships
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

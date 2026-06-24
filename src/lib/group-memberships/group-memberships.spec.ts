import mockAxios from 'jest-mock-axios'
import { AxiosInstance } from 'axios'
import { GroupMemberships } from './group-memberships'
import { GroupMembership } from './group-memberships.types'

describe('GroupMemberships', () => {
    let groupMemberships: GroupMemberships

    const mockMemberships: GroupMembership[] = [
        { id: 1, user_id: 10, group_id: 1 },
        { id: 2, user_id: 11, group_id: 2 },
    ]

    beforeEach(() => {
        mockAxios.reset()
        groupMemberships = new GroupMemberships(mockAxios as never as AxiosInstance)
    })

    it('creates the instance', () => expect(groupMemberships).toBeTruthy())

    describe('list', () => {
        it('lists all group memberships', async () => {
            jest.spyOn(mockAxios, 'get').mockResolvedValue({ data: { group_memberships: mockMemberships } })
            await expect(groupMemberships.list()).resolves.toEqual(mockMemberships)
            expect(mockAxios.get).toHaveBeenCalledWith('/group_memberships.json')
        })

        it('lists memberships by groupId', async () => {
            jest.spyOn(mockAxios, 'get').mockResolvedValue({ data: { group_memberships: [mockMemberships[0]] } })
            await expect(groupMemberships.list(1)).resolves.toEqual([mockMemberships[0]])
            expect(mockAxios.get).toHaveBeenCalledWith('/groups/1/memberships.json')
        })

        it('lists memberships by userId', async () => {
            jest.spyOn(mockAxios, 'get').mockResolvedValue({ data: { group_memberships: mockMemberships } })
            await expect(groupMemberships.list(undefined, 10)).resolves.toEqual(mockMemberships)
            expect(mockAxios.get).toHaveBeenCalledWith('/users/10/group_memberships.json')
        })
    })

    describe('create', () => {
        it('creates a group membership', async () => {
            const newMembership: GroupMembership = { id: 3, user_id: 12, group_id: 1 }
            jest.spyOn(mockAxios, 'post').mockResolvedValue({ data: { group_membership: newMembership } })
            await expect(groupMemberships.create({ user_id: 12, group_id: 1 })).resolves.toEqual(newMembership)
            expect(mockAxios.post).toHaveBeenCalledWith('/group_memberships.json', {
                group_membership: { user_id: 12, group_id: 1 },
            })
        })
    })

    describe('delete', () => {
        it('deletes a group membership', async () => {
            jest.spyOn(mockAxios, 'delete').mockResolvedValue({})
            await expect(groupMemberships.delete(1)).resolves.toBeUndefined()
            expect(mockAxios.delete).toHaveBeenCalledWith('/group_memberships/1.json')
        })
    })
})

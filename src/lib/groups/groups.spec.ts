import mockAxios from 'jest-mock-axios'
import { AxiosInstance } from 'axios'
import { Groups } from './groups'
import { Group } from './groups.types'

describe('Groups', () => {
    let groups: Groups

    const mockGroups: Group[] = [
        { id: 1, name: 'Support' },
        { id: 2, name: 'Engineering' },
    ]

    beforeEach(() => {
        mockAxios.reset()
        groups = new Groups(mockAxios as never as AxiosInstance)
    })

    it('creates the instance', () => expect(groups).toBeTruthy())

    describe('list', () => {
        it('lists all groups', async () => {
            jest.spyOn(mockAxios, 'get').mockResolvedValue({ data: { groups: mockGroups } })
            await expect(groups.list()).resolves.toEqual(mockGroups)
            expect(mockAxios.get).toHaveBeenCalledWith('/groups.json')
        })

        it('lists groups by groupId (wraps singular response in array)', async () => {
            jest.spyOn(mockAxios, 'get').mockResolvedValue({ data: { group: mockGroups[0] } })
            await expect(groups.list(1)).resolves.toEqual([mockGroups[0]])
            expect(mockAxios.get).toHaveBeenCalledWith('/groups/1.json')
        })

        it('lists groups by userId', async () => {
            jest.spyOn(mockAxios, 'get').mockResolvedValue({ data: { groups: mockGroups } })
            await expect(groups.list(undefined, 42)).resolves.toEqual(mockGroups)
            expect(mockAxios.get).toHaveBeenCalledWith('/users/42/groups.json')
        })
    })

    describe('create', () => {
        it('creates a group', async () => {
            const newGroup: Group = { id: 3, name: 'New Group' }
            jest.spyOn(mockAxios, 'post').mockResolvedValue({ data: { group: newGroup } })
            await expect(groups.create({ name: 'New Group' })).resolves.toEqual(newGroup)
            expect(mockAxios.post).toHaveBeenCalledWith('/groups.json', {
                group: { name: 'New Group' },
            })
        })
    })

    describe('update', () => {
        it('updates a group', async () => {
            const updated: Group = { id: 1, name: 'Updated Support' }
            jest.spyOn(mockAxios, 'put').mockResolvedValue({ data: { group: updated } })
            await expect(groups.update(1, { name: 'Updated Support' })).resolves.toEqual(updated)
            expect(mockAxios.put).toHaveBeenCalledWith('/groups/1.json', {
                group: { name: 'Updated Support' },
            })
        })
    })

    describe('delete', () => {
        it('deletes a group', async () => {
            jest.spyOn(mockAxios, 'delete').mockResolvedValue({})
            await expect(groups.delete(1)).resolves.toBeUndefined()
            expect(mockAxios.delete).toHaveBeenCalledWith('/groups/1.json')
        })
    })
})

import mockAxios from 'jest-mock-axios'
import { AxiosInstance } from 'axios'
import { OrganizationMemberships } from './organization-memberships'
import { OrganizationMembership } from './organization-memberships.types'

describe('OrganizationMemberships', () => {
    let orgMemberships: OrganizationMemberships

    const mockMembership: OrganizationMembership = { id: 1, user_id: 10, organization_id: 100 }
    const mockMembership2: OrganizationMembership = { id: 2, user_id: 10, organization_id: 200 }

    beforeEach(() => {
        mockAxios.reset()
        orgMemberships = new OrganizationMemberships(mockAxios as never as AxiosInstance)
    })

    it('creates the instance', () => expect(orgMemberships).toBeTruthy())

    describe('create', () => {
        it('creates an organization membership', async () => {
            jest.spyOn(mockAxios, 'post').mockResolvedValue({
                data: { organization_membership: mockMembership },
            })
            await expect(
                orgMemberships.create({ user_id: 10, organization_id: 100 }),
            ).resolves.toEqual(mockMembership)
            expect(mockAxios.post).toHaveBeenCalledWith('/organization_memberships.json', {
                organization_membership: { user_id: 10, organization_id: 100 },
            })
        })
    })

    describe('listByUser', () => {
        it('lists memberships for a user (single page)', async () => {
            jest.spyOn(mockAxios, 'get').mockResolvedValue({
                data: { organization_memberships: [mockMembership], next_page: null },
            })
            await expect(orgMemberships.listByUser(10)).resolves.toEqual([mockMembership])
            expect(mockAxios.get).toHaveBeenCalledWith('/users/10/organization_memberships.json')
        })

        it('paginates through multiple pages', async () => {
            jest.spyOn(mockAxios, 'get')
                .mockResolvedValueOnce({
                    data: {
                        organization_memberships: [mockMembership],
                        next_page: '/users/10/organization_memberships.json?page=2',
                    },
                })
                .mockResolvedValueOnce({
                    data: { organization_memberships: [mockMembership2], next_page: null },
                })
            await expect(orgMemberships.listByUser(10)).resolves.toEqual([
                mockMembership,
                mockMembership2,
            ])
        })
    })

    describe('delete', () => {
        it('deletes an organization membership', async () => {
            jest.spyOn(mockAxios, 'delete').mockResolvedValue({})
            await expect(orgMemberships.delete(1)).resolves.toBeUndefined()
            expect(mockAxios.delete).toHaveBeenCalledWith('/organization_memberships/1.json')
        })
    })
})

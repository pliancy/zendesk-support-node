import mockAxios from 'jest-mock-axios'
import { AxiosInstance } from 'axios'
import { Organizations } from './organizations'
import { Organization } from './organizations.types'

describe('Organizations', () => {
    let organizations: Organizations

    const mockOrgs: Organization[] = [
        { id: 1, name: 'Acme Corp' },
        { id: 2, name: 'Globex' },
    ]

    beforeEach(() => {
        mockAxios.reset()
        organizations = new Organizations(mockAxios as never as AxiosInstance)
    })

    it('creates the instance', () => expect(organizations).toBeTruthy())

    describe('list', () => {
        it('returns all organizations (single page)', async () => {
            jest.spyOn(mockAxios, 'get').mockResolvedValue({
                data: { organizations: mockOrgs, next_page: null },
            })
            await expect(organizations.list()).resolves.toEqual(mockOrgs)
            expect(mockAxios.get).toHaveBeenCalledWith('/organizations.json')
        })

        it('paginates through multiple pages', async () => {
            jest.spyOn(mockAxios, 'get')
                .mockResolvedValueOnce({
                    data: { organizations: [mockOrgs[0]], next_page: '/organizations.json?page=2' },
                })
                .mockResolvedValueOnce({
                    data: { organizations: [mockOrgs[1]], next_page: null },
                })
            await expect(organizations.list()).resolves.toEqual(mockOrgs)
        })
    })

    describe('find', () => {
        it('searches organizations by name', async () => {
            jest.spyOn(mockAxios, 'get').mockResolvedValue({ data: { organizations: [mockOrgs[0]] } })
            await expect(organizations.find('Acme')).resolves.toEqual([mockOrgs[0]])
            expect(mockAxios.get).toHaveBeenCalledWith('/organizations/autocomplete.json', {
                params: { name: 'Acme' },
            })
        })
    })

    describe('create', () => {
        it('creates an organization', async () => {
            const newOrg: Organization = { id: 3, name: 'New Co' }
            jest.spyOn(mockAxios, 'post').mockResolvedValue({ data: { organization: newOrg } })
            await expect(organizations.create({ name: 'New Co' })).resolves.toEqual(newOrg)
            expect(mockAxios.post).toHaveBeenCalledWith('/organizations.json', {
                organization: { name: 'New Co' },
            })
        })
    })

    describe('update', () => {
        it('updates an organization', async () => {
            const updated: Organization = { id: 1, name: 'Acme Corp Updated' }
            jest.spyOn(mockAxios, 'put').mockResolvedValue({ data: { organization: updated } })
            await expect(organizations.update(1, { name: 'Acme Corp Updated' })).resolves.toEqual(updated)
            expect(mockAxios.put).toHaveBeenCalledWith('/organizations/1.json', {
                organization: { name: 'Acme Corp Updated' },
            })
        })
    })

    describe('upsert', () => {
        it('upserts an organization', async () => {
            const org: Organization = { id: 1, name: 'Acme Corp' }
            jest.spyOn(mockAxios, 'post').mockResolvedValue({ data: { organization: org } })
            await expect(organizations.upsert({ name: 'Acme Corp' })).resolves.toEqual(org)
            expect(mockAxios.post).toHaveBeenCalledWith('/organizations/create_or_update.json', {
                organization: { name: 'Acme Corp' },
            })
        })
    })

    describe('delete', () => {
        it('deletes an organization', async () => {
            jest.spyOn(mockAxios, 'delete').mockResolvedValue({})
            await expect(organizations.delete(1)).resolves.toBeUndefined()
            expect(mockAxios.delete).toHaveBeenCalledWith('/organizations/1.json')
        })
    })
})

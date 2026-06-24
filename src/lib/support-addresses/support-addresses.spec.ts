import mockAxios from 'jest-mock-axios'
import { AxiosInstance } from 'axios'
import { SupportAddresses } from './support-addresses'
import { SupportAddress } from './support-addresses.types'

describe('SupportAddresses', () => {
    let supportAddresses: SupportAddresses

    const mockAddresses: SupportAddress[] = [
        { id: 1, email: 'support@example.com', name: 'Support' },
        { id: 2, email: 'help@example.com', name: 'Help Desk' },
    ]

    beforeEach(() => {
        mockAxios.reset()
        supportAddresses = new SupportAddresses(mockAxios as never as AxiosInstance)
    })

    it('creates the instance', () => expect(supportAddresses).toBeTruthy())

    describe('list', () => {
        it('returns all support addresses (single page)', async () => {
            jest.spyOn(mockAxios, 'get').mockResolvedValue({
                data: { recipient_addresses: mockAddresses, next_page: null },
            })
            await expect(supportAddresses.list()).resolves.toEqual(mockAddresses)
            expect(mockAxios.get).toHaveBeenCalledWith('/recipient_addresses.json')
        })

        it('paginates through multiple pages', async () => {
            jest.spyOn(mockAxios, 'get')
                .mockResolvedValueOnce({
                    data: {
                        recipient_addresses: [mockAddresses[0]],
                        next_page: '/recipient_addresses.json?page=2',
                    },
                })
                .mockResolvedValueOnce({
                    data: { recipient_addresses: [mockAddresses[1]], next_page: null },
                })
            await expect(supportAddresses.list()).resolves.toEqual(mockAddresses)
        })
    })

    describe('create', () => {
        it('creates a support address', async () => {
            const newAddr: SupportAddress = { id: 3, email: 'new@example.com' }
            jest.spyOn(mockAxios, 'post').mockResolvedValue({
                data: { recipient_address: newAddr },
            })
            await expect(supportAddresses.create({ email: 'new@example.com' })).resolves.toEqual(
                newAddr,
            )
            expect(mockAxios.post).toHaveBeenCalledWith('/recipient_addresses.json', {
                recipient_address: { email: 'new@example.com' },
            })
        })
    })

    describe('update', () => {
        it('updates a support address', async () => {
            const updated: SupportAddress = {
                id: 1,
                email: 'support@example.com',
                name: 'Updated Support',
            }
            jest.spyOn(mockAxios, 'put').mockResolvedValue({ data: { recipient_address: updated } })
            await expect(
                supportAddresses.update(1, {
                    email: 'support@example.com',
                    name: 'Updated Support',
                }),
            ).resolves.toEqual(updated)
            expect(mockAxios.put).toHaveBeenCalledWith('/recipient_addresses/1.json', {
                recipient_address: { email: 'support@example.com', name: 'Updated Support' },
            })
        })
    })

    describe('verify', () => {
        it('verifies a support address', async () => {
            const addr: SupportAddress = {
                id: 1,
                email: 'support@example.com',
                forward_status: 'verified',
            }
            jest.spyOn(mockAxios, 'put').mockResolvedValue({ data: { recipient_address: addr } })
            await expect(supportAddresses.verify(1)).resolves.toEqual(addr)
            expect(mockAxios.put).toHaveBeenCalledWith('/recipient_addresses/1/verify.json', {
                type: 'forwarding',
            })
        })
    })

    describe('delete', () => {
        it('deletes a support address', async () => {
            jest.spyOn(mockAxios, 'delete').mockResolvedValue({})
            await expect(supportAddresses.delete(1)).resolves.toBeUndefined()
            expect(mockAxios.delete).toHaveBeenCalledWith('/recipient_addresses/1.json')
        })
    })
})

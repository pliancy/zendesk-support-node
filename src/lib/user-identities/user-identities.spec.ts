import mockAxios from 'jest-mock-axios'
import { AxiosInstance } from 'axios'
import { UserIdentities } from './user-identities'
import { UserIdentity } from './user-identities.types'

describe('UserIdentities', () => {
    let userIdentities: UserIdentities

    const mockIdentity: UserIdentity = {
        id: 1,
        user_id: 10,
        type: 'email',
        value: 'jane@example.com',
        primary: true,
        verified: true,
    }

    beforeEach(() => {
        mockAxios.reset()
        userIdentities = new UserIdentities(mockAxios as never as AxiosInstance)
    })

    it('creates the instance', () => expect(userIdentities).toBeTruthy())

    describe('list', () => {
        it('lists identities for a user', async () => {
            jest.spyOn(mockAxios, 'get').mockResolvedValue({
                data: { identities: [mockIdentity] },
            })
            await expect(userIdentities.list(10)).resolves.toEqual([mockIdentity])
            expect(mockAxios.get).toHaveBeenCalledWith('/users/10/identities.json')
        })
    })

    describe('update', () => {
        it('updates a user identity', async () => {
            const updated: UserIdentity = { ...mockIdentity, value: 'jane.new@example.com' }
            jest.spyOn(mockAxios, 'put').mockResolvedValue({ data: { identity: updated } })
            await expect(
                userIdentities.update(10, 1, { value: 'jane.new@example.com' }),
            ).resolves.toEqual(updated)
            expect(mockAxios.put).toHaveBeenCalledWith('/users/10/identities/1.json', {
                identity: { value: 'jane.new@example.com' },
            })
        })
    })
})

import { AxiosInstance } from 'axios'
import { UserIdentity } from './user-identities.types'

export class UserIdentities {
    constructor(private readonly http: AxiosInstance) {}

    async list(userId: number): Promise<UserIdentity[]> {
        const { data } = await this.http.get<{ identities: UserIdentity[] }>(
            `/users/${userId}/identities.json`,
        )
        return data.identities
    }

    async update(
        userId: number,
        identityId: number,
        identity: Partial<UserIdentity>,
    ): Promise<UserIdentity> {
        const { data } = await this.http.put<{ identity: UserIdentity }>(
            `/users/${userId}/identities/${identityId}.json`,
            { identity },
        )
        return data.identity
    }
}

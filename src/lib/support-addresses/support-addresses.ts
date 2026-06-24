import { AxiosInstance } from 'axios'
import { SupportAddress } from './support-addresses.types'

export class SupportAddresses {
    private readonly baseUrl = '/recipient_addresses'

    constructor(private readonly http: AxiosInstance) {}

    async list(): Promise<SupportAddress[]> {
        type Page = { recipient_addresses: SupportAddress[]; next_page: string | null }
        const results: SupportAddress[] = []
        let nextPage: string | null = `${this.baseUrl}.json`

        while (nextPage !== null) {
            const page: Page = (await this.http.get<Page>(nextPage)).data
            results.push(...page.recipient_addresses)
            nextPage = page.next_page
        }

        return results
    }

    async create(supportAddress: SupportAddress): Promise<SupportAddress> {
        const { data } = await this.http.post<{ recipient_address: SupportAddress }>(
            `${this.baseUrl}.json`,
            { recipient_address: supportAddress },
        )
        return data.recipient_address
    }

    async update(supportAddressId: number, supportAddress: SupportAddress): Promise<SupportAddress> {
        const { data } = await this.http.put<{ recipient_address: SupportAddress }>(
            `${this.baseUrl}/${supportAddressId}.json`,
            { recipient_address: supportAddress },
        )
        return data.recipient_address
    }

    async verify(supportAddressId: number): Promise<SupportAddress> {
        const { data } = await this.http.put<{ recipient_address: SupportAddress }>(
            `${this.baseUrl}/${supportAddressId}/verify.json`,
            { type: 'forwarding' },
        )
        return data.recipient_address
    }

    async delete(supportAddressId: number): Promise<void> {
        await this.http.delete(`${this.baseUrl}/${supportAddressId}.json`)
    }
}

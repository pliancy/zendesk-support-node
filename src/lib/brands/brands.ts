import { AxiosInstance } from 'axios'
import { Brand } from './brands.types'

export class Brands {
    private readonly baseUrl = '/brands'

    constructor(private readonly http: AxiosInstance) {}

    async list(): Promise<Brand[]> {
        type Page = { brands: Brand[]; next_page: string | null }
        const results: Brand[] = []
        let nextPage: string | null = `${this.baseUrl}.json`

        while (nextPage !== null) {
            const page: Page = (await this.http.get<Page>(nextPage)).data
            results.push(...page.brands)
            nextPage = page.next_page
        }

        return results
    }

    async create(brand: Brand): Promise<Brand> {
        const { data } = await this.http.post<{ brand: Brand }>(`${this.baseUrl}.json`, { brand })
        return data.brand
    }

    async update(brandId: number, brand: Brand): Promise<Brand> {
        const { data } = await this.http.put<{ brand: Brand }>(`${this.baseUrl}/${brandId}.json`, { brand })
        return data.brand
    }

    async delete(brandId: number): Promise<void> {
        await this.http.delete(`${this.baseUrl}/${brandId}.json`)
    }
}

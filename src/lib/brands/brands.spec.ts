import mockAxios from 'jest-mock-axios'
import { AxiosInstance } from 'axios'
import { Brands } from './brands'
import { Brand } from './brands.types'

describe('Brands', () => {
    let brands: Brands

    const mockBrands: Brand[] = [
        { id: 1, name: 'Main Brand', subdomain: 'main' },
        { id: 2, name: 'Secondary Brand', subdomain: 'secondary' },
    ]

    beforeEach(() => {
        mockAxios.reset()
        brands = new Brands(mockAxios as never as AxiosInstance)
    })

    it('creates the instance', () => expect(brands).toBeTruthy())

    describe('list', () => {
        it('returns all brands (single page)', async () => {
            jest.spyOn(mockAxios, 'get').mockResolvedValue({
                data: { brands: mockBrands, next_page: null },
            })
            await expect(brands.list()).resolves.toEqual(mockBrands)
            expect(mockAxios.get).toHaveBeenCalledWith('/brands.json')
        })

        it('paginates through multiple pages', async () => {
            jest.spyOn(mockAxios, 'get')
                .mockResolvedValueOnce({ data: { brands: [mockBrands[0]], next_page: '/brands.json?page=2' } })
                .mockResolvedValueOnce({ data: { brands: [mockBrands[1]], next_page: null } })
            await expect(brands.list()).resolves.toEqual(mockBrands)
        })
    })

    describe('create', () => {
        it('creates a brand', async () => {
            const newBrand: Brand = { id: 3, name: 'New Brand', subdomain: 'newbrand' }
            jest.spyOn(mockAxios, 'post').mockResolvedValue({ data: { brand: newBrand } })
            await expect(brands.create({ name: 'New Brand', subdomain: 'newbrand' })).resolves.toEqual(newBrand)
            expect(mockAxios.post).toHaveBeenCalledWith('/brands.json', {
                brand: { name: 'New Brand', subdomain: 'newbrand' },
            })
        })
    })

    describe('update', () => {
        it('updates a brand', async () => {
            const updated: Brand = { id: 1, name: 'Updated Brand', subdomain: 'main' }
            jest.spyOn(mockAxios, 'put').mockResolvedValue({ data: { brand: updated } })
            await expect(brands.update(1, { name: 'Updated Brand', subdomain: 'main' })).resolves.toEqual(updated)
            expect(mockAxios.put).toHaveBeenCalledWith('/brands/1.json', {
                brand: { name: 'Updated Brand', subdomain: 'main' },
            })
        })
    })

    describe('delete', () => {
        it('deletes a brand', async () => {
            jest.spyOn(mockAxios, 'delete').mockResolvedValue({})
            await expect(brands.delete(1)).resolves.toBeUndefined()
            expect(mockAxios.delete).toHaveBeenCalledWith('/brands/1.json')
        })
    })
})

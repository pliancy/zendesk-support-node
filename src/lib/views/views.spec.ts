import mockAxios from 'jest-mock-axios'
import { AxiosInstance } from 'axios'
import { Views } from './views'
import { View } from './views.types'

describe('Views', () => {
    let views: Views

    const mockViews: View[] = [
        { id: 1, title: 'All Tickets' },
        { id: 2, title: 'Open Tickets' },
    ]

    beforeEach(() => {
        mockAxios.reset()
        views = new Views(mockAxios as never as AxiosInstance)
    })

    it('creates the instance', () => expect(views).toBeTruthy())

    describe('list', () => {
        it('returns all views (single page)', async () => {
            jest.spyOn(mockAxios, 'get').mockResolvedValue({
                data: { views: mockViews, next_page: null },
            })
            await expect(views.list()).resolves.toEqual(mockViews)
            expect(mockAxios.get).toHaveBeenCalledWith('/views.json')
        })

        it('paginates through multiple pages', async () => {
            jest.spyOn(mockAxios, 'get')
                .mockResolvedValueOnce({
                    data: { views: [mockViews[0]], next_page: '/views.json?page=2' },
                })
                .mockResolvedValueOnce({ data: { views: [mockViews[1]], next_page: null } })
            await expect(views.list()).resolves.toEqual(mockViews)
        })
    })

    describe('create', () => {
        it('creates a view', async () => {
            const newView: View = { id: 3, title: 'Urgent Tickets' }
            jest.spyOn(mockAxios, 'post').mockResolvedValue({ data: { view: newView } })
            await expect(views.create({ title: 'Urgent Tickets' })).resolves.toEqual(newView)
            expect(mockAxios.post).toHaveBeenCalledWith('/views.json', {
                view: { title: 'Urgent Tickets' },
            })
        })
    })

    describe('update', () => {
        it('updates a view', async () => {
            const updated: View = { id: 1, title: 'All Open Tickets' }
            jest.spyOn(mockAxios, 'put').mockResolvedValue({ data: { view: updated } })
            await expect(views.update(1, { title: 'All Open Tickets' })).resolves.toEqual(updated)
            expect(mockAxios.put).toHaveBeenCalledWith('/views/1.json', {
                view: { title: 'All Open Tickets' },
            })
        })
    })

    describe('delete', () => {
        it('deletes a view', async () => {
            jest.spyOn(mockAxios, 'delete').mockResolvedValue({})
            await expect(views.delete(1)).resolves.toBeUndefined()
            expect(mockAxios.delete).toHaveBeenCalledWith('/views/1.json')
        })
    })
})

import mockAxios from 'jest-mock-axios'
import { AxiosInstance } from 'axios'
import { Triggers } from './triggers'
import { Trigger } from './triggers.types'

describe('Triggers', () => {
    let triggers: Triggers

    const mockTriggers: Trigger[] = [
        { id: 1, title: 'Notify assignee on comment' },
        { id: 2, title: 'Close ticket after 4 days' },
    ]

    beforeEach(() => {
        mockAxios.reset()
        triggers = new Triggers(mockAxios as never as AxiosInstance)
    })

    it('creates the instance', () => expect(triggers).toBeTruthy())

    describe('list', () => {
        it('returns all triggers (single page)', async () => {
            jest.spyOn(mockAxios, 'get').mockResolvedValue({
                data: { triggers: mockTriggers, next_page: null },
            })
            await expect(triggers.list()).resolves.toEqual(mockTriggers)
            expect(mockAxios.get).toHaveBeenCalledWith('/triggers.json')
        })

        it('paginates through multiple pages', async () => {
            jest.spyOn(mockAxios, 'get')
                .mockResolvedValueOnce({
                    data: { triggers: [mockTriggers[0]], next_page: '/triggers.json?page=2' },
                })
                .mockResolvedValueOnce({ data: { triggers: [mockTriggers[1]], next_page: null } })
            await expect(triggers.list()).resolves.toEqual(mockTriggers)
        })
    })

    describe('create', () => {
        it('creates a trigger', async () => {
            const newTrigger: Trigger = { id: 3, title: 'Auto-assign ticket' }
            jest.spyOn(mockAxios, 'post').mockResolvedValue({ data: { trigger: newTrigger } })
            await expect(triggers.create({ title: 'Auto-assign ticket' })).resolves.toEqual(
                newTrigger,
            )
            expect(mockAxios.post).toHaveBeenCalledWith('/triggers.json', {
                trigger: { title: 'Auto-assign ticket' },
            })
        })
    })

    describe('update', () => {
        it('updates a trigger', async () => {
            const updated: Trigger = { id: 1, title: 'Updated trigger' }
            jest.spyOn(mockAxios, 'put').mockResolvedValue({ data: { trigger: updated } })
            await expect(triggers.update(1, { title: 'Updated trigger' })).resolves.toEqual(updated)
            expect(mockAxios.put).toHaveBeenCalledWith('/triggers/1.json', {
                trigger: { title: 'Updated trigger' },
            })
        })
    })

    describe('delete', () => {
        it('deletes a trigger', async () => {
            jest.spyOn(mockAxios, 'delete').mockResolvedValue({})
            await expect(triggers.delete(1)).resolves.toBeUndefined()
            expect(mockAxios.delete).toHaveBeenCalledWith('/triggers/1.json')
        })
    })
})

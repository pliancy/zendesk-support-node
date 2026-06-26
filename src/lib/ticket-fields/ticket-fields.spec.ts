import mockAxios from 'jest-mock-axios'
import { AxiosInstance } from 'axios'
import { TicketFields } from './ticket-fields'
import { TicketField } from './ticket-fields.types'

describe('TicketFields', () => {
    let ticketFields: TicketFields

    const mockField: TicketField = {
        id: 42,
        type: 'tagger',
        title: 'Customer',
        custom_field_options: [
            { id: 1, name: 'ACME', value: 'acme' },
            { id: 2, name: 'GLOBEX', value: 'globex' },
        ],
    }

    beforeEach(() => {
        mockAxios.reset()
        ticketFields = new TicketFields(mockAxios as never as AxiosInstance)
    })

    it('creates the instance', () => expect(ticketFields).toBeTruthy())

    describe('get', () => {
        it('gets a ticket field by id', async () => {
            jest.spyOn(mockAxios, 'get').mockResolvedValue({ data: { ticket_field: mockField } })
            await expect(ticketFields.get(42)).resolves.toEqual(mockField)
            expect(mockAxios.get).toHaveBeenCalledWith('/ticket_fields/42.json')
        })
    })

    describe('update', () => {
        it('updates a ticket field', async () => {
            const updated: TicketField = {
                ...mockField,
                custom_field_options: [
                    ...(mockField.custom_field_options ?? []),
                    { name: 'NEWCO', value: 'newco' },
                ],
            }
            jest.spyOn(mockAxios, 'put').mockResolvedValue({ data: { ticket_field: updated } })
            await expect(
                ticketFields.update(42, { custom_field_options: updated.custom_field_options }),
            ).resolves.toEqual(updated)
            expect(mockAxios.put).toHaveBeenCalledWith('/ticket_fields/42.json', {
                ticket_field: { custom_field_options: updated.custom_field_options },
            })
        })
    })
})

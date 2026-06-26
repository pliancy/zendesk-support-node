import { AxiosInstance } from 'axios'
import { TicketField } from './ticket-fields.types'

export class TicketFields {
    private readonly baseUrl = '/ticket_fields'

    constructor(private readonly http: AxiosInstance) {}

    async get(fieldId: number): Promise<TicketField> {
        const { data } = await this.http.get<{ ticket_field: TicketField }>(
            `${this.baseUrl}/${fieldId}.json`,
        )
        return data.ticket_field
    }

    async update(fieldId: number, field: Partial<TicketField>): Promise<TicketField> {
        const { data } = await this.http.put<{ ticket_field: TicketField }>(
            `${this.baseUrl}/${fieldId}.json`,
            { ticket_field: field },
        )
        return data.ticket_field
    }
}

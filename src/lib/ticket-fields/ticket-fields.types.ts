export interface TicketFieldCustomOption {
    id?: number
    name: string
    raw_name?: string
    value: string
    default?: boolean
}

export interface TicketField {
    id?: number
    url?: string
    type?: string
    title?: string
    raw_title?: string
    description?: string
    raw_description?: string
    position?: number
    active?: boolean
    required?: boolean
    collapsed_for_agents?: boolean
    regexp_for_validation?: string | null
    title_in_portal?: string
    raw_title_in_portal?: string
    visible_in_portal?: boolean
    editable_in_portal?: boolean
    required_in_portal?: boolean
    tag?: string | null
    created_at?: string
    updated_at?: string
    removable?: boolean
    key?: string | null
    agent_description?: string | null
    custom_field_options?: TicketFieldCustomOption[]
}

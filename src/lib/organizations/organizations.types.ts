export interface Organization {
    id?: number
    url?: string
    external_id?: string
    name: string
    created_at?: string
    updated_at?: string
    domain_names?: string[]
    details?: string
    notes?: string
    group_id?: number
    shared_tickets?: boolean
    shared_comments?: boolean
    tags?: string[]
    organization_fields?: Record<string, unknown>
}

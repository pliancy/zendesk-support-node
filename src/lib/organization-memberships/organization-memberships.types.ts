export interface OrganizationMembership {
    id?: number
    url?: string
    user_id: number
    organization_id: number
    default?: boolean
    organization_name?: string
    created_at?: string
    updated_at?: string
}

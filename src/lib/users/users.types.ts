export interface User {
    id?: number
    url?: string
    name: string
    email?: string
    external_id?: string
    role?: 'end-user' | 'agent' | 'admin'
    organization_id?: number
    suspended?: boolean
    verified?: boolean
    skip_verify_email?: boolean
    created_at?: string
    updated_at?: string
    user_fields?: Record<string, unknown>
}

export interface UserIdentity {
    id?: number
    url?: string
    user_id?: number
    type: 'email' | 'twitter' | 'facebook' | 'google' | 'phone_number' | 'agent_forwarding' | 'sdk'
    value: string
    verified?: boolean
    primary?: boolean
    created_at?: string
    updated_at?: string
}

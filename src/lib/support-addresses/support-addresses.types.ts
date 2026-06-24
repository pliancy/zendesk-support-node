export interface SupportAddress {
    id?: number
    email: string
    name?: string
    default?: boolean
    brand_id?: number
    forward_status?: 'waiting' | 'verified' | 'failed'
    spf_status?: 'unknown' | 'verified' | 'failed'
    cname_status?: 'unknown' | 'verified' | 'failed'
    domain_verification_status?: 'unknown' | 'verified' | 'failed'
    domain_verification_code?: string | null
    dns_results?: unknown
    created_at?: string
    updated_at?: string
}

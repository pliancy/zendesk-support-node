export interface BrandAttachment {
    id: number
    file_name: string
    content_url: string
    content_type: string
    size: number
    thumbnails?: BrandAttachment[]
    inline: boolean
    deleted: boolean
}

export interface Brand {
    id?: number
    url?: string
    name: string
    brand_url?: string
    has_help_center?: boolean
    help_center_state?: 'enabled' | 'disabled' | 'restricted'
    active?: boolean
    default?: boolean
    logo?: BrandAttachment
    ticket_form_ids?: number[]
    created_at?: string
    updated_at?: string
    subdomain: string
    host_mapping?: string
    signature_template?: string
}

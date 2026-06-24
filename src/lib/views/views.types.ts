export interface View {
    id?: number
    title: string
    active?: boolean
    restriction?: Record<string, unknown> | null
    position?: number
    execution?: Record<string, unknown>
    conditions?: Record<string, unknown>
    description?: string
    created_at?: string
    updated_at?: string
}

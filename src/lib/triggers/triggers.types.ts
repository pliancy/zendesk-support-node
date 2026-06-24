export interface TriggerCondition {
    field: string
    operator?: string
    value: string
}

export interface TriggerConditions {
    all: TriggerCondition[]
    any: TriggerCondition[]
}

export interface TriggerAction {
    field: string
    value: string
}

export interface Trigger {
    id?: number
    title: string
    active?: boolean
    position?: number
    conditions?: TriggerConditions
    actions?: TriggerAction[]
    description?: string
    created_at?: string
    updated_at?: string
}

import { AxiosInstance } from 'axios'
import { ZendeskConfig } from './zendesk.types'
import { createHttpAgent } from './utils/create-http-agent'
import { Brands } from './brands/brands'
import { GroupMemberships } from './group-memberships/group-memberships'
import { Groups } from './groups/groups'
import { Organizations } from './organizations/organizations'
import { SupportAddresses } from './support-addresses/support-addresses'
import { Triggers } from './triggers/triggers'
import { Views } from './views/views'

export class Zendesk {
    private readonly httpAgent: AxiosInstance

    brands: Brands

    groupMemberships: GroupMemberships

    groups: Groups

    organizations: Organizations

    supportAddresses: SupportAddresses

    triggers: Triggers

    views: Views

    constructor(config: ZendeskConfig) {
        this.httpAgent = createHttpAgent(config)
        this.brands = new Brands(this.httpAgent)
        this.groupMemberships = new GroupMemberships(this.httpAgent)
        this.groups = new Groups(this.httpAgent)
        this.organizations = new Organizations(this.httpAgent)
        this.supportAddresses = new SupportAddresses(this.httpAgent)
        this.triggers = new Triggers(this.httpAgent)
        this.views = new Views(this.httpAgent)
    }
}

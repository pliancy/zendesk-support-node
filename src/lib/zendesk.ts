import { AxiosInstance } from 'axios'
import { ZendeskConfig } from './zendesk.types'
import { createHttpAgent } from './utils/create-http-agent'
import { Brands } from './brands/brands'
import { GroupMemberships } from './group-memberships/group-memberships'
import { Groups } from './groups/groups'
import { OrganizationMemberships } from './organization-memberships/organization-memberships'
import { Organizations } from './organizations/organizations'
import { SupportAddresses } from './support-addresses/support-addresses'
import { TicketFields } from './ticket-fields/ticket-fields'
import { Triggers } from './triggers/triggers'
import { UserIdentities } from './user-identities/user-identities'
import { Users } from './users/users'
import { Views } from './views/views'

export class Zendesk {
    private readonly httpAgent: AxiosInstance

    brands: Brands

    groupMemberships: GroupMemberships

    groups: Groups

    organizationMemberships: OrganizationMemberships

    organizations: Organizations

    supportAddresses: SupportAddresses

    ticketFields: TicketFields

    triggers: Triggers

    userIdentities: UserIdentities

    users: Users

    views: Views

    constructor(config: ZendeskConfig) {
        this.httpAgent = createHttpAgent(config)
        this.brands = new Brands(this.httpAgent)
        this.groupMemberships = new GroupMemberships(this.httpAgent)
        this.groups = new Groups(this.httpAgent)
        this.organizationMemberships = new OrganizationMemberships(this.httpAgent)
        this.organizations = new Organizations(this.httpAgent)
        this.supportAddresses = new SupportAddresses(this.httpAgent)
        this.ticketFields = new TicketFields(this.httpAgent)
        this.triggers = new Triggers(this.httpAgent)
        this.userIdentities = new UserIdentities(this.httpAgent)
        this.users = new Users(this.httpAgent)
        this.views = new Views(this.httpAgent)
    }
}

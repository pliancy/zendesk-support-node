/**
 * The Config for the Zendesk class
 * This interface allows utilization of Zendesk's Support API
 * @export
 * @interface ZendeskConfig
 */
export interface ZendeskConfig {
    subdomain: string;
    username: string;
    password: string;
}
export interface Organization {
    id?: number;
    url?: string;
    external_id?: string;
    name: string;
    created_at?: string;
    updated_at?: string;
    domain_names?: string[];
    details?: string;
    notes?: string;
    group_id?: number;
    shared_tickets?: boolean;
    shared_comments?: boolean;
    tags?: string[];
    organization_fields?: object;
}
export interface Group {
    id?: number;
    url?: string;
    name: string;
    description?: string;
    default?: boolean;
    deleted?: boolean;
    created_at?: string;
    updated_at?: string;
}
export interface Condition {
    field: string;
    operator?: string;
    value: string;
}
export interface Conditions {
    all: Condition[];
    any: Condition[];
}
export interface Action {
    field: string;
    value: string;
}
export interface Trigger {
    id?: number;
    title: string;
    active?: boolean;
    position?: number;
    conditions?: Conditions;
    actions?: Action[];
    description?: string;
    created_at?: string;
    updated_at?: string;
}
export interface View {
    id?: number;
    title: string;
    active?: boolean;
    restriction?: object;
    position?: number;
    execution?: object;
    conditions?: object;
    description?: string;
    created_at?: string;
    updated_at?: string;
}
export interface Attachment {
    id: number;
    file_name: string;
    content_url: string;
    content_type: string;
    size: number;
    thumbnails?: Attachment[];
    inline: boolean;
    deleted: boolean;
}
export interface Brand {
    id?: number;
    url?: string;
    name: string;
    brand_url?: string;
    has_help_center?: boolean;
    help_center_state?: 'enabled' | 'disabled' | 'restricted';
    active?: boolean;
    default?: boolean;
    logo?: Attachment;
    ticket_form_ids?: number[];
    created_at?: string;
    updated_at?: string;
    subdomain: string;
    host_mapping?: string;
    signature_template?: string;
}
export interface GroupMembership {
    id?: number;
    url?: string;
    user_id: number;
    group_id: number;
    default?: boolean;
    created_at?: string;
    updated_at?: string;
}
export interface SupportAddress {
    id?: number;
    email: string;
    name?: string;
    default?: boolean;
    brand_id?: number;
    forward_status?: 'waiting' | 'verified' | 'failed';
    spf_status?: 'unknown' | 'verified' | 'failed';
    cname_status?: 'unknown' | 'verified' | 'failed';
    domain_verification_status?: 'unknown' | 'verified' | 'failed';
    domain_verification_code?: string | null;
    dns_results?: any;
    created_at?: string;
    updated_at?: string;
}
export declare class Zendesk {
    config: ZendeskConfig;
    domain: string;
    reqHeaders: any;
    constructor(_config: ZendeskConfig);
    getGroups(groupId?: number, userId?: number): Promise<Group[]>;
    createGroup(group: Group): Promise<Group>;
    updateGroup(groupId: number, group: Group): Promise<Group>;
    deleteGroup(groupId: number): Promise<Group>;
    getGroupMemberships(groupId?: number, userId?: number): Promise<GroupMembership[]>;
    createGroupMembership(groupMembership: GroupMembership): Promise<GroupMembership>;
    deleteGroupMembership(groupMembershipId: number): Promise<GroupMembership>;
    getOrganizations(organizationId?: number): Promise<Organization[]>;
    /**
     * Searches for Zendesk organizations by name and returns an array of any matches.
     * Uses autocompletion, so the array of results is based off of orgs whose name starts
     * with the given name param.
     * @param {string} name friendly name of the organization
     */
    findOrganizations(name: string): Promise<object[]>;
    createOrganization(organization: Organization): Promise<Organization>;
    updateOrganization(organizationId: number, organization: Organization): Promise<Organization>;
    upsertOrganization(organization: Organization): Promise<Organization>;
    deleteOrganization(organizationId: number): Promise<Organization>;
    getViews(): Promise<View[]>;
    createView(view: View): Promise<View>;
    updateView(viewId: number, view: View): Promise<View>;
    deleteView(viewId: number): Promise<View>;
    getTriggers(): Promise<Trigger[]>;
    createTrigger(trigger: Trigger): Promise<Trigger>;
    updateTrigger(triggerId: number, trigger: Trigger): Promise<Trigger>;
    deleteTrigger(triggerId: number): Promise<Trigger>;
    getBrands(): Promise<Brand[]>;
    createBrand(brand: Brand): Promise<Brand>;
    updateBrand(brandId: number, brand: Brand): Promise<Brand>;
    deleteBrand(brandId: number): Promise<Brand>;
    getSupportAddresses(): Promise<SupportAddress[]>;
    createSupportAddress(supportAddress: SupportAddress): Promise<SupportAddress>;
    updateSupportAddress(supportAddressId: number, supportAddress: SupportAddress): Promise<SupportAddress>;
    verifySupportAddress(supportAddressId: number): Promise<SupportAddress>;
    deleteSupportAddress(supportAddressId: number): Promise<SupportAddress>;
    private _zendeskRequest;
}

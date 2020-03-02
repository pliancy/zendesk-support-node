import got from 'got'

/**
 * The Config for the Zendesk class
 * This interface allows utilization of Zendesk's Support API
 * @export
 * @interface ZendeskConfig
 */
export interface ZendeskConfig {
  subdomain: string
  username: string
  password: string
}

export interface Organization {
  id?: number
  url?: string
  external_id?: string
  name: string
  created_at?: string
  updated_at?: string
  domain_names?: string[]
  details?: string
  notes?: string
  group_id?: number
  shared_tickets?: boolean
  shared_comments?: boolean
  tags?: string[]
  organization_fields?: object
}

export interface Group {
  id?: number
  url?: string
  name: string
  description?: string
  default?: boolean
  deleted?: boolean
  created_at?: string
  updated_at?: string
}

export interface Condition {
  field: string
  operator?: string
  value: string
}

export interface Conditions {
  all: Condition[]
  any: Condition[]
}

export interface Action {
  field: string
  value: string
}

export interface Trigger {
  id?: number
  title: string
  active?: boolean
  position?: number
  conditions?: Conditions
  actions?: Action[]
  description?: string
  created_at?: string
  updated_at?: string
}

export interface View {
  id?: number
  title: string
  active?: boolean
  restriction?: object // or null
  position?: number
  execution?: object
  conditions?: object
  description?: string
  created_at?: string
  updated_at?: string
}

export interface Attachment {
  id: number
  file_name: string
  content_url: string
  content_type: string
  size: number
  thumbnails?: Attachment[] // technically, an array of photo attachments
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
  logo?: Attachment
  ticket_form_ids?: number[]
  created_at?: string
  updated_at?: string
  subdomain: string
  host_mapping?: string
  signature_template?: string
}

export interface GroupMembership {
  id?: number
  url?: string
  user_id: number
  group_id: number
  default?: boolean
  created_at?: string
  updated_at?: string
}

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
  dns_results?: any // TODO
  created_at?: string
  updated_at?: string
}

export class Zendesk {
  config: ZendeskConfig
  domain: string
  reqHeaders: any

  constructor (_config: ZendeskConfig) {
    this.config = _config
    this.reqHeaders = {
      'content-type': 'application/json',
      accept: 'application/json'
    }
    this.domain = `https://${_config.subdomain}.zendesk.com/api/v2`
  }

  //
  // Groups
  //

  async getGroups (groupId?: number, userId?: number): Promise<Group[]> {
    try {
      let url = this.domain

      if (groupId !== undefined) {
        url = `${url}/groups/${groupId}.json`
      } else if (userId !== undefined) {
        url = `${url}/users/${userId}/groups.json`
      } else {
        url = `${url}/groups.json`
      }

      let res = await this._zendeskRequest(
        url,
        { headers: this.reqHeaders }
      )
      // TODO: handle pagination
      return JSON.parse(res.body)
    } catch (err) {
      return err
    }
  }

  async createGroup (group: Group): Promise<Group> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/groups.json`,
        {
          headers: this.reqHeaders,
          method: 'POST',
          body: JSON.stringify({
            group: group
          })
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  async updateGroup (groupId: number, group: Group): Promise<Group> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/groups/${groupId}.json`,
        {
          headers: this.reqHeaders,
          method: 'PUT',
          body: JSON.stringify({
            group: group
          })
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  async deleteGroup (groupId: number): Promise<Group> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/groups/${groupId}.json`,
        {
          headers: this.reqHeaders,
          method: 'DELETE'
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  //
  // Group Membership
  //

  async getGroupMemberships (groupId?: number, userId?: number): Promise<GroupMembership[]> {
    try {
      let url = this.domain

      if (groupId !== undefined) {
        url = `${url}/groups/${groupId}/memberships.json`
      } else if (userId !== undefined) {
        url = `${url}/users/${userId}/group_memberships.json`
      } else {
        url = `${url}/group_memberships.json`
      }

      let res = await this._zendeskRequest(
        url,
        { headers: this.reqHeaders }
      )
      // TODO: handle pagination
      return JSON.parse(res.body)
    } catch (err) {
      return err
    }
  }

  async createGroupMembership (groupMembership: GroupMembership): Promise<GroupMembership> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/group_memberships.json`,
        {
          headers: this.reqHeaders,
          method: 'POST',
          body: JSON.stringify({
            group_membership: groupMembership
          })
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  async deleteGroupMembership (groupMembershipId: number): Promise<GroupMembership> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/group_memberships/${groupMembershipId}.json`,
        {
          headers: this.reqHeaders,
          method: 'DELETE'
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  //
  // Organizations
  //

  async getOrganizations (organizationId?: number): Promise<Organization[]> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/organizations.json`,
        { headers: this.reqHeaders }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  /**
   * Searches for Zendesk organizations by name and returns an array of any matches.
   * Uses autocompletion, so the array of results is based off of orgs whose name starts
   * with the given name param.
   * @param {string} name friendly name of the organization
   */
  async findOrganizations (name: string): Promise<object[]> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/organizations/autocomplete.json?name=${name}/`,
        { headers: this.reqHeaders }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  async createOrganization (organization: Organization): Promise<Organization> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/organizations.json`,
        {
          headers: this.reqHeaders,
          method: 'POST',
          body: JSON.stringify({
            organization: organization
          })
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  async updateOrganization (organizationId: number, organization: Organization): Promise<Organization> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/organizations/${organizationId}.json`,
        {
          headers: this.reqHeaders,
          method: 'PUT',
          body: JSON.stringify({
            organization: organization
          })
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  async upsertOrganization (organization: Organization): Promise<Organization> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/organizations/create_or_update.json`,
        {
          headers: this.reqHeaders,
          method: 'POST',
          body: JSON.stringify({
            organization: organization
          })
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  async deleteOrganization (organizationId: number): Promise<Organization> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/organizations/${organizationId}.json`,
        {
          headers: this.reqHeaders,
          method: 'DELETE'
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  //
  // Views
  //

  async getViews (): Promise<View[]> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/views.json`,
        { headers: this.reqHeaders }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  // TODO: createView

  async createView (view: View): Promise<View> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/views.json`,
        {
          headers: this.reqHeaders,
          method: 'POST',
          body: JSON.stringify({
            view
          })
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  // TODO: updateView

  async updateView (viewId: number, view: View): Promise<View> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/views/${viewId}.json`,
        {
          headers: this.reqHeaders,
          method: 'PUT',
          body: JSON.stringify({
            view
          })
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  async deleteView (viewId: number): Promise<View> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/views/${viewId}.json`,
        {
          headers: this.reqHeaders,
          method: 'DELETE'
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  //
  // Triggers
  //

  async getTriggers (): Promise<Trigger[]> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/triggers.json`,
        { headers: this.reqHeaders }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  async createTrigger (trigger: Trigger): Promise<Trigger> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/triggers.json`,
        {
          headers: this.reqHeaders,
          method: 'POST',
          body: JSON.stringify({
            trigger
          })
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  async updateTrigger (triggerId: number, trigger: Trigger): Promise<Trigger> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/triggers/${triggerId}.json`,
        {
          headers: this.reqHeaders,
          method: 'PUT',
          body: JSON.stringify({
            trigger
          })
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  async deleteTrigger (triggerId: number): Promise<Trigger> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/triggers/${triggerId}.json`,
        {
          headers: this.reqHeaders,
          method: 'DELETE'
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  //
  // Brands
  //

  async getBrands (): Promise<Brand[]> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/brands.json`,
        { headers: this.reqHeaders }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  // TODO: createBrand

  async createBrand (brand: Brand): Promise<Brand> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/brands.json`,
        {
          headers: this.reqHeaders,
          method: 'POST',
          body: JSON.stringify({
            brand
          })
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  // TODO: updateBrand

  async updateBrand (brandId: number, brand: Brand): Promise<Brand> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/brands/${brandId}.json`,
        {
          headers: this.reqHeaders,
          method: 'PUT',
          body: JSON.stringify({
            brand
          })
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  async deleteBrand (brandId: number): Promise<Brand> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/brands/${brandId}.json`,
        {
          headers: this.reqHeaders,
          method: 'DELETE'
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  //
  // Support Addresses
  //

  async getSupportAddresses (): Promise<SupportAddress[]> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/recipient_addresses.json`,
        { headers: this.reqHeaders }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  async createSupportAddress (supportAddress: SupportAddress): Promise<SupportAddress> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/recipient_addresses.json`,
        {
          headers: this.reqHeaders,
          method: 'POST',
          body: JSON.stringify({
            recipient_address: supportAddress
          })
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  async updateSupportAddress (supportAddressId: number, supportAddress: SupportAddress): Promise<SupportAddress> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/recipient_addresses/${supportAddressId}.json`,
        {
          headers: this.reqHeaders,
          method: 'PUT',
          body: JSON.stringify({
            recipient_address: supportAddress
          })
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  async verifySupportAddress (supportAddressId: number): Promise<SupportAddress> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/recipient_addresses/${supportAddressId}/verify.json`,
        {
          headers: this.reqHeaders,
          method: 'PUT',
          body: JSON.stringify({
            type: 'forwarding'
          })
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  async deleteSupportAddress (supportAddressId: number): Promise<SupportAddress> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/recipient_addresses/${supportAddressId}.json`,
        {
          headers: this.reqHeaders,
          method: 'DELETE'
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  private async _zendeskRequest (url: string, options: any): Promise<any> {
    try {
      let res = await got(url, {
        ...options,
        auth: `${this.config.username}:${this.config.password}` // take care of basic auth
      })
      return res
    } catch (err) {
      throw err
    }
  }
}

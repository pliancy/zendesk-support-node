import got from 'got'

/**
 * The Config for the Zendesk class
 * This interface allows utilization of Zendesk's Support API
 * @export
 * @interface ZendeskConfig
 */
interface ZendeskConfig {
  subdomain: string
  username: string
  password: string
}

interface Organization {
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

interface Group {
  id?: number
  url?: string
  name: string
  description?: string
  default?: boolean
  deleted?: boolean
  created_at?: string
  updated_at?: string
}

interface Condition {
  field: string
  operator?: string
  value: string
}

interface Conditions {
  all: Condition[]
  any: Condition[]
}

interface Action {
  field: string
  value: string
}

interface Trigger {
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

interface View {
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

interface Attachment {
  id: number
  file_name: string
  content_url: string
  content_type: string
  size: number
  thumbnails?: Attachment[] // technically, an array of photo attachments
  inline: boolean
  deleted: boolean
}

interface Brand {
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

interface GroupMembership {
  id?: number
  url?: string
  user_id: number
  group_id: number
  default?: boolean
  created_at?: string
  updated_at?: string
}

interface SupportAddress {
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
  dns_results?: any // todo
  created_at?: string
  updated_at?: string
}

class Zendesk {
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

  async getOrganizations (): Promise<Organization[]> {
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

  async createSomething (): Promise<object[]> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/something/`,
        {
          headers: this.reqHeaders,
          method: 'POST',
          body: JSON.stringify({})
        }
      )
      return JSON.parse(res.body)
    } catch (err) {
      throw err
    }
  }

  async deleteSomething (): Promise<object[]> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/something/`,
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

export = Zendesk

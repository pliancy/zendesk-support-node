import got from 'got'

/**
 * The Config for the Zendesk class
 * This interface allows utilization of Zendesk's Support API
 * @export
 * @interface IZendeskConfig
 */
interface IZendeskConfig {
  subdomain: string
  username: string
  password: string
}

class Zendesk {
  config: IZendeskConfig
  domain: string
  reqHeaders: any

  constructor (_config: IZendeskConfig) {
    this.config = _config
    this.reqHeaders = {
      'content-type': 'application/json',
      accept: 'application/json'
    }
    this.domain = `https://${_config.subdomain}.zendesk.com/api/v2/`
  }

  //
  // Something
  //

  async getSomething (): Promise<object[]> {
    try {
      let res = await this._zendeskRequest(
        `${this.domain}/something/`,
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
      let res = await got(url, options)
      return res
    } catch (err) {
      throw err
    }
  }
}

export = Zendesk

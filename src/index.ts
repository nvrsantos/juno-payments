import axios from 'axios'
import * as qs from 'query-string'
import 'dotenv/config'

interface Config {
  mode: string
  clientId: string
  clienteSecret: string
  token: string
}

interface Headers {
  Authorization: string,
  'X-Api-Version': number
}

interface Banks {
  number: number
  name: string
}

/**
 * @name Juno
 * @description Juno
 */
class Juno {
  private baseURLSandbox = 'https://sandbox.boletobancario.com/'
  private baseURLProduction = 'https://api.juno.com.br/'
  private mode = 'dev'
  private clientId: string
  private clientSecret: string
  private hashToken = ''

  private headers: Headers = {
    Authorization: '',
    'X-Api-Version': 2
  }

  private token: string

  private getTokenAcessEndPoint = 'authorization-server/oauth/token'

  private endpointDigitalAccounts = 'api-integration/digital-accounts'
  private endpointBanks = 'api-integration/data/banks'
  private endpointCompanyTypes = 'api-integration/data/company-types'

  constructor (config: Config) {
    this.mode = config.mode
    this.clientId = config.clientId
    this.clientSecret = config.clienteSecret
    this.token = config.token
    this.hashToken = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')
  }

  /**
   * Authentication Method: Gets a Bearer Token
   *
   * @private
   * @returns {Promise<void>}
   * @memberof Juno
   */
  private async getTokenAcess (): Promise<void> {
    try {
      const result = await axios.post(
        this.getUrl() + this.getTokenAcessEndPoint,
        qs.stringify({ grant_type: 'client_credentials' }),
        {
          headers: {
            Authorization: 'Basic ' + this.hashToken,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )

      this.setHeaders(result.data.access_token)
    } catch (error) {
      throw new Error('Erro ao tentar gerar token de acesso')
    }
  }

  private async setHeaders (bearerToken: string): Promise<void> {
    this.headers.Authorization = 'Bearer ' + bearerToken
  }

  /**
   * Get Endpoint
   *
   * @private
   * @returns {string}
   * @memberof Juno
   */
  private getUrl (): string {
    return this.mode === 'dev'
      ? this.baseURLSandbox
      : this.baseURLProduction
  }

  /**
   * Get a Headers Bearer Token
   *
   * @private
   * @returns {Headers}
   * @memberof Juno
   */
  private getHeaders (): Headers {
    return this.headers
  }

  public async consultarConta (): Promise<void> {
    try {
      await this.getTokenAcess()
      const result = await axios.post(
        this.getUrl() + this.endpointDigitalAccounts,
        {},
        {
          headers: {
            ...this.getHeaders(),
            'X-Resource-Token': this.token
          }
        })
      console.log(result)
    } catch (error) {
      console.log(error.response.data)
      throw new Error(error.response.data.error)
    }
  }

  /**
   * Lista Bancos
   *
   * @returns {Promise<Banks[]>}
   * @memberof Juno
   */
  public async listarBancos (): Promise<Banks[]> {
    try {
      await this.getTokenAcess()
      const result = await axios.get(
        this.getUrl() + this.endpointBanks,
        {
          headers: this.getHeaders()
        })
      return result.data._embedded.banks
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  }

  /**
   * Lista Bancos
   *
   * @returns {Promise<Banks[]>}
   * @memberof Juno
   */
  public async listarTiposEmpresa (): Promise<string[]> {
    try {
      await this.getTokenAcess()
      const result = await axios.get(
        this.getUrl() + this.endpointCompanyTypes,
        {
          headers: this.getHeaders()

        })
      return result.data.companyTypes
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  }
}

export default Juno

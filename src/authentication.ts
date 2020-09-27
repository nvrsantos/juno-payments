import axios from 'axios'
import * as qs from 'query-string'
import { Headers } from './interface'

/**
 * Authentication - @SevidorDeAutorização
 *
 * @class Authentication
 */
class Authentication {
  private hashToken: string
  private url: string

  constructor (hashToken: string, url: string) {
    this.hashToken = hashToken
    this.url = url
  }

  /**
   * Authentication Method: Gets a Bearer Token
   *
   * @private
   * @returns {Promise<void>}
   * @memberof Juno
   */
  public async getTokenAcess (): Promise<Headers> {
    try {
      const result = await axios.post(
        `${this.url}authorization-server/oauth/token`,
        qs.stringify({ grant_type: 'client_credentials' }),
        {
          headers: {
            Authorization: 'Basic ' + this.hashToken,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      return {
        Authorization: 'Bearer ' + result.data.access_token,
        'X-Api-Version': 2
      }
    } catch (error) {
      throw new Error('Erro ao tentar gerar token de acesso')
    }
  }
}
export { Authentication }

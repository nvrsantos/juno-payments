import { Authentication } from '@/authentication'
import { SaldoResponse } from '../types/response'
import axios from 'axios'

/**
 * Saldo - @Gestão
 *
 * @class Saldo
 */
class Saldo {
  private auth: Authentication
  private url: string
  private token: string

  constructor (auth: Authentication, url: string, token: string) {
    this.auth = auth
    this.url = url
    this.token = token
  }

  /**
   * Consulta saldo
   *
   * @returns {Promise<Banks[]>}
   * @memberof Juno
   */
  public async consultarSaldo (): Promise<SaldoResponse> {
    try {
      const result = await axios.get(
        `${this.url}api-integration/balance`,
        {
          headers: {
            ...(await this.auth.getTokenAcess()),
            'X-Resource-Token': this.token
          }
        })
      return result.data
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  }
}

export { Saldo }

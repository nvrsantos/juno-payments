import { Authentication } from '../authentication'
import axios from 'axios'

/**
 * Contas Digitais - @Gestão
 *
 * @class ContasDigitais
 */
class ContasDigitais {
  private auth: Authentication
  private url: string
  private token: string

  constructor (auth: Authentication, url: string, token: string) {
    this.auth = auth
    this.url = url
    this.token = token
  }

  public async consultarConta (): Promise<any> {
    try {
      const result = await axios.post(
        `${this.url}api-integration/digital-accounts`,
        {},
        {
          headers: {
            ...(await this.auth.getTokenAcess()),
            'X-Resource-Token': this.token
          }
        }
      )
      return result
    } catch (error) {
      console.log(error.response.data)
      throw new Error(error.response.data.error)
    }
  }
}

export { ContasDigitais }

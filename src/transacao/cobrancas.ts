import axios from 'axios'
import { stringify } from 'query-string'
import { Authentication } from '../authentication'
import { CreatedPayment, GerarCobranca, ListaCobrancaResponse, QueryListarCobrancas } from '../interface'

/**
 * Cobranças - @Gestão
 *
 * @class Cobrancas
 */
class Cobrancas {
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
  public async gerarCobranca (formulario: GerarCobranca): Promise<CreatedPayment> {
    try {
      const result = await axios.post(
        `${this.url}api-integration/charges`,
        formulario,
        {
          headers: {
            ...(await this.auth.getTokenAcess()),
            'X-Resource-Token': this.token
          }
        }
      )
      return result.data._embedded
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  }

  public async listarCobrancas (query: QueryListarCobrancas): Promise<ListaCobrancaResponse> {
    try {
      const result = await axios.get(
        `${this.url}api-integration/charges?${stringify(query)}`,
        {
          headers: {
            ...(await this.auth.getTokenAcess()),
            'X-Resource-Token': this.token
          }
        }
      )
      return result.data
    } catch (error) {
      console.log(error)
      throw new Error(error.response.data.error)
    }
  }
}

export { Cobrancas }

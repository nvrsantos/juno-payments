import axios from 'axios'
// import { stringify } from 'query-string'
import { Authentication } from '../authentication'
import { CriarPlano } from '../types/interface'
import {
  CriarPlanoResponse,
  ListarPlanosResponse
} from '../types/response'

/**
 * Assinatura - @Transação
 *
 * @class Assinatura
 */
class Assinatura {
  private auth: Authentication
  private url: string
  private token: string

  constructor (auth: Authentication, url: string, token: string) {
    this.auth = auth
    this.url = url
    this.token = token
  }

  /**
   * Criar Plano
   *
   * O primeiro passo para ter suas cobranças recorrentes é criando um plano de assinaturas.
   *
   * O plano de assinaturas possui as configurações das cobranças que serão geradas.
   *
   * A frequência das cobranças será mensal.
   *
   * @param {CriarPlano} formulario payload
   * @returns {Promise<GerarCobrancaResponse>}
   * @memberof Assinatura
   */
  public async criarPlano (formulario: CriarPlano): Promise<CriarPlanoResponse> {
    try {
      const result = await axios.post(
        `${this.url}api-integration/plans`,
        formulario,
        {
          headers: {
            ...(await this.auth.getTokenAcess()),
            'X-Resource-Token': this.token
          }
        }
      )
      return result.data
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  }

  /**
   * Listar Planos
   *
   * Retorna uma listagem de todos os planos criados para consulta.
   *
   * @returns {Promise<GerarCobrancaResponse>}
   * @memberof Assinatura
   */
  public async listarPlanos (): Promise<ListarPlanosResponse> {
    try {
      const result = await axios.get(
        `${this.url}api-integration/plans`,
        {
          headers: {
            ...(await this.auth.getTokenAcess()),
            'X-Resource-Token': this.token
          }
        }
      )
      return result.data
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  }
}

export { Assinatura }

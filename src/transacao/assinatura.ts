import axios from 'axios'
import { Authentication } from '../authentication'
import { CriarAssinatura, CriarPlano } from '../types/interface'
import {
  ConstultarPlanoResponse,
  ConsultarAssinaturaResponse,
  CriarAssinaturaResponse,
  CriarPlanoResponse,
  ListarAssinaturasResponse,
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

  constructor(auth: Authentication, url: string, token: string) {
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
  public async criarPlano(formulario: CriarPlano): Promise<CriarPlanoResponse> {
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
   * @returns {Promise<ListarPlanosResponse>}
   * @memberof Assinatura
   */
  public async listarPlanos(): Promise<ListarPlanosResponse> {
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

  /**
   * Consultar Plano
   * 
   * Retorna um objeto com detalhes do plano
   * 
   * @param {String} id
   * @returns {Promise<ConstultarPlanoResponse>}
   * @memberof Assinatura
   */
  public async consultarPlano(id: string): Promise<ConstultarPlanoResponse> {
    try {
      const result = await axios.get(
        `${this.url}api-integration/plans/${id}`,
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
   * Criar Assinaturas
   * 
   * Retorna o objeto da assinatura
   * 
   * @param {CriarAssinatura} formulario payload
   * @returns {Promise<CriarAssinaturaResponse>}
   * @memberof Assinatura
   */
  public async criarAssinatura(formulario: CriarAssinatura): Promise<CriarAssinaturaResponse> {
    try {
      const result = await axios.post(
        `${this.url}api-integration/subscriptions`,
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
 * Listar Assinaturas
 * 
 * Retorna uma lista das assinaturas
 * 
 * @returns {Promise<ListarAssinaturasResponse>}
 * @memberof Assinatura
 */
  public async listarAssinaturas(): Promise<ListarAssinaturasResponse> {
    try {
      const result = await axios.get(
        `${this.url}api-integration/subscriptions`,
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
   * Constultar Assinatura
   * 
   * Retorna um objeto da assinatura especifica
   * @param {String} id
   * @returns {Promise<ConsultarAssinaturaResponse>}
   * @memberof Assinatura
   */
  public async consultarAssinatura(id: string): Promise<ConsultarAssinaturaResponse> {
    try {
      const result = await axios.get(
        `${this.url}api-integration/subscriptions/${id}`,
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
   * Desativar Assinatura
   * 
   * Retorna um objeto da assinatura desativada
   * @param {String} id
   * @returns {Promise<ConsultarAssinaturaResponse}
   * @memberof Assinatura
   */
  public async desativarAssinatura(id: string) {
    try {
      const result = await axios.post(
        `${this.url}api-integration/subscriptions/${id}/deactivation`,
        null,
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
   * Reativar Assinatura
   * 
   * Retorna um objeto da assinatura ativada
   * @param {String} id
   * @returns {Promise<ConsultarAssinaturaResponse>}
   * @memberof Assinatura
   */
  public async reativarAssinatura(id: string) {
    try {
      const result = await axios.post(
        `${this.url}api-integration/subscriptions/${id}/activation`,
        null,
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
   * Cancelar assinatura
   * 
   * Retorna um objeto da assinatura cancelada
   * @param {String} id
   * @returns {Promise<ConsultarAssinaturaResponse>}
   * @memberof Assinatura
   */
  public async cancelarAssinatura(id: string){
    try {
      const result = await axios.post(
        `${this.url}api-integration/subscriptions/${id}/cancelation`,
        null, 
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
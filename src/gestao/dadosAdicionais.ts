import { BanksRensponse } from '../types/response'
import axios from 'axios'
import { Authentication } from '../authentication'

/**
 * Dados Adicionais - @Gestão
 *
 * @class DadosAdicionais
 */
class DadosAdicionais {
  private auth: Authentication
  private url: string

  constructor (auth: Authentication, url: string) {
    this.auth = auth
    this.url = url
  }

  /**
   * Lista Bancos
   *
   * @returns {Promise<Banks[]>}
   * @memberof Juno
   */
  public async listarBancos (): Promise<BanksRensponse[]> {
    try {
      const result = await axios.get(
        `${this.url}api-integration/data/banks`,
        {
          headers: { ...(await this.auth.getTokenAcess()) }
        }
      )
      return result.data._embedded.banks
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  }

  /**
   * Lista Tipos de Empresas
   *
   * @returns {Promise<Banks[]>}
   * @memberof Juno
   */
  public async listarTiposEmpresa (): Promise<string[]> {
    try {
      const result = await axios.get(
        `${this.url}api-integration/data/company-types`,
        {
          headers: { ...(await this.auth.getTokenAcess()) }
        }
      )
      return result.data.companyTypes
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  }
}

export { DadosAdicionais }

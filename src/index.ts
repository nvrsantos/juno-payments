import axios from 'axios'
import * as qs from 'query-string'
import 'dotenv/config'
import { CreatedPayment, GerarCobranca } from './interface'

interface Config {
  mode: string;
  clientId: string;
  clienteSecret: string;
  token: string;
}

interface Headers {
  Authorization: string;
  'X-Api-Version': number;
}

interface Banks {
  number: number;
  name: string;
}

interface Saldo {
  balance: string;
  withheldBalance: string;
  transferableBalance: string;
}

/**
 * @name Juno
 * @description Juno
 */
class Juno {
  private baseURLSandbox = 'https://sandbox.boletobancario.com/';
  private baseURLProduction = 'https://api.juno.com.br/';
  private mode = 'dev';
  private clientId: string;
  private clientSecret: string;
  private hashToken = '';

  private headers: Headers = {
    Authorization: '',
    'X-Api-Version': 2
  };

  private token: string;

  constructor (config: Config) {
    this.mode = config.mode
    this.clientId = config.clientId
    this.clientSecret = config.clienteSecret
    this.token = config.token
    this.hashToken = Buffer.from(
      `${this.clientId}:${this.clientSecret}`
    ).toString('base64')
  }

  /**
   * Authentication Method: Gets a Bearer Token
   *
   * @private
   * @returns {Promise<void>}
   * @memberof Juno
   */
  private async getTokenAcess (): Promise<Headers> {
    try {
      const result = await axios.post(
        this.getUrl('authorization-server/oauth/token'),
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
  private getUrl (param: string): string {
    return this.mode === 'dev'
      ? this.baseURLSandbox + param
      : this.baseURLProduction + param
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
      const result = await axios.post(
        this.getUrl('api-integration/digital-accounts'),
        {},
        {
          headers: {
            ...(await this.getTokenAcess()),
            'X-Resource-Token': this.token
          }
        }
      )
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
      const result = await axios.get(
        this.getUrl('api-integration/data/banks'),
        {
          headers: { ...(await this.getTokenAcess()) }
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
        this.getUrl('api-integration/data/company-types'),
        {
          headers: { ...(await this.getTokenAcess()) }
        }
      )
      return result.data.companyTypes
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  }

  /**
   * Consulta saldo
   *
   * @returns {Promise<Banks[]>}
   * @memberof Juno
   */
  public async consultarSaldo (): Promise<Saldo> {
    try {
      const result = await axios.get(this.getUrl('api-integration/balance'), {
        headers: {
          ...(await this.getTokenAcess()),
          'X-Resource-Token': this.token
        }
      })
      return result.data
    } catch (error) {
      throw new Error(error.response.data.error)
    }
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
        this.getUrl('api-integration/charges'),
        formulario,
        {
          headers: {
            ...(await this.getTokenAcess()),
            'X-Resource-Token': this.token
          }
        }
      )
      return result.data._embedded
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  }
}

export default Juno

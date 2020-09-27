import 'dotenv/config'
import { Authentication } from './authentication'
import { Config } from './interface'
import { DadosAdicionais } from './gestao/dadosAdicionais'
import { Saldo } from './gestao/saldo'
import { ContasDigitais } from './gestao/contasDigitais'
import { Cobrancas } from './transacao/cobrancas'

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

  private auth: Authentication

  // Gestão
  public dadosAdicionais: DadosAdicionais
  public saldo: Saldo
  public contasDigitais: ContasDigitais

  // Transação
  public cobrancas: Cobrancas

  private token: string;

  constructor (config: Config) {
    this.mode = config.mode
    this.clientId = config.clientId
    this.clientSecret = config.clienteSecret
    this.token = config.token
    this.hashToken = Buffer.from(
      `${this.clientId}:${this.clientSecret}`
    ).toString('base64')

    this.auth = new Authentication(this.hashToken, this.getUrl())

    this.contasDigitais = new ContasDigitais(this.auth, this.getUrl(), this.token)
    this.dadosAdicionais = new DadosAdicionais(this.auth, this.getUrl())
    this.saldo = new Saldo(this.auth, this.getUrl(), this.token)

    this.cobrancas = new Cobrancas(this.auth, this.getUrl(), this.token)
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
}

export default Juno

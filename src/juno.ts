import 'dotenv/config'
import { Authentication } from './authentication'
import { Config, Gestao, Transacao } from './index'
import { DadosAdicionais } from './gestao/dadosAdicionais'
import { Saldo } from './gestao/saldo'
import { ContasDigitais } from './gestao/contasDigitais'
import { Cobrancas } from './transacao/cobrancas'
import { Assinatura } from './transacao/assinatura'
import { Pagamentos } from './transacao/pagamentos'

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

  public gestao: Gestao
  public transacao: Transacao

  private token: string;
  private publicToken: string;

  /**
   * Create a Juno Instance.
   * @param {Config} config
   * @memberof Juno
   */
  constructor (config: Config) {
    this.mode = config.mode
    this.clientId = config.clientId
    this.clientSecret = config.clientSecret
    this.token = config.token
    this.publicToken = config.publicToken
    this.hashToken = Buffer.from(
      `${this.clientId}:${this.clientSecret}`
    ).toString('base64')

    this.auth = new Authentication(this.hashToken, this.getUrl())

    this.gestao = {
      contasDigitais: new ContasDigitais(this.auth, this.getUrl(), this.token),
      dadosAdicionais: new DadosAdicionais(this.auth, this.getUrl()),
      saldo: new Saldo(this.auth, this.getUrl(), this.token)
    }

    this.transacao = {
      cobrancas: new Cobrancas(this.auth, this.getUrl(), this.token),
      assinatura: new Assinatura(this.auth, this.getUrl(), this.token),
      pagamentos: new Pagamentos(this.auth, this.getUrl(), this.publicToken, this.mode)
    } as Transacao
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

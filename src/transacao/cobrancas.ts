import axios from 'axios'
// import { stringify } from 'query-string'
import { Authentication } from '../authentication'
import { GerarCobranca, QueryListarCobrancas } from '../types/interface'
import {
  CancelarCobrancaResponse,
  ConsultarCobrancaResponse,
  GerarCobrancaResponse,
  ListaCobrancaResponse
} from '../types/response'

/**
 * Cobranças - @Transação
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
   * Gerar Cobrança
   *
   * Emita cobranças para cartão de crédito ou boleto, com ou sem split de pagamento.
   *
   * Para cobranças na modalidade split, é possível informar um ou mais destinatários para divisão,
   * na qual o recipientToken corresponde a cada conta digital envolvida. Caso o emissor delimitado
   * no X-Resource-Token esteja envolvido na divisão, este também deve ser informado em um dos objetos desse array,
   * além dos demais destinatários.
   *
   * Os parâmetros amount e percentage definem, respectivamente, a divisão do valor do split
   * de maneira fixa ou percentual, não podendo ser enviados juntos na requisição.
   *
   * Caso a divisão de valores resulte em um número com mais de 2 casas decimais,
   * a partilha de valores não ocorre de maneira exata, desse modo é preciso definir
   * quem ficará com o remanescente em amountRemainder.
   *
   * @returns {Promise<CreatedPayment>}
   * @memberof Cobrancas
   */
  public async gerarCobranca (formulario: GerarCobranca): Promise<GerarCobrancaResponse> {
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
      return result.data
    } catch (error) {
      throw new Error(error.response.data.error)
    }
  }

  /**
   * Listar Cobranças
   *
   * Muito útil na conciliação de recebimentos este método fornece uma listagem por
   * página das cobranças de uma conta digital de acordo ao filtros disponíveis.
   *
   * Para avançar para as próximas páginas ou voltar para a página anterior deve
   * ser utilizado os links previous e next devolvidos na resposta da chamada.
   *
   * Devolve 20 cobranças por páginas, podendo ser estendido até 100 páginas com pageSize=100.
   *
   * @param {QueryListarCobrancas} query
   * @returns {Promise<ListaCobrancaResponse>}
   * @memberof Cobrancas
   */
  public async listarCobrancas (query: QueryListarCobrancas): Promise<ListaCobrancaResponse> {
    try {
      const result = await axios.get(
        `${this.url}api-integration/charges?${JSON.stringify(query)}`,
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
   * Consultar Cobrança
   *
   * Uma cobrança emitida emitida pode ser consultada a qualquer
   * momento para que se obtenha seu estado atual.
   *
   * Para a consulta, utilize o ID da cobrança devolvido no momento da emissão.
   *
   * O ID seguirá o padrão de identidade prefixada conforme descrito na referência da API:
   *
   * @param {string} id
   * @returns {Promise<ConsultarCobrancaResponse>}
   * @memberof Cobrancas
   */
  public async consultarCobranca (id: string): Promise<ConsultarCobrancaResponse> {
    try {
      const result = await axios.get(
        `${this.url}api-integration/charges/${id}`,
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
   * Cancelar Cobrança
   *
   * Uma cobrança emitida emitida pode ser cancelada a qualquer momento desde que não tenha recebido pagamento.
   *
   * Isso é válido para cobranças de qualquer paymentType que estejam como active, ou seja, em aberto.
   *
   * Para transações que tenham sido capturadas, seu cancelamento deve ser feito através desse recurso.
   *
   * O sucesso no cancelamento retornará um 204 de sucesso sem qualquer conteúdo.
   *
   * @param {string} id
   * @returns {Promise<CancelarCobrancaResponse>}
   * @memberof Cobrancas
   */
  public async cancelarCobranca (id: string): Promise<CancelarCobrancaResponse> {
    try {
      const result = await axios.put(
        `${this.url}api-integration/charges/${id}/cancelation`,
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

export { Cobrancas }

import { ContasDigitais } from '../gestao/contasDigitais'
/* eslint-disable no-trailing-spaces */

import { DadosAdicionais } from '../gestao/dadosAdicionais'
import { Saldo } from '../gestao/saldo'
import { Assinatura } from '../transacao/assinatura'
import { Cobrancas } from '../transacao/cobrancas'

/**
 * Gerar Cobrança @payload
 *
 * @export
 * @interface GerarCobranca
 */
export interface GerarCobranca {
  charge: {
    /**
     * Descrição sobre a que se refere o pagamento
     *
     * **Formato:** Livre com até 400 caracteres - Até 4 linhas  
     * **Exemplos:** Pedido 48192 / TV 40 Polegadas / Cosméticos
     *
     * @type {string}
     * @memberof GerarCobranca
     */
    description: string
    /**
     * Código de referência da cobrança.
     *
     * Atrelada a cada cobrança gerada. O número de itens deve ser igual ao número de parcelas
     * 
     * **Formato:** Livre com até 255 caracteres
     *
     * @type {string[]}
     * @memberof GerarCobranca
     */
    reference?: string[]
    /**
     * Valor total da cobrança em caso de cobrança parcelada
     *
     * Este código fica associado à(s) cobrança(s) criada(s) 
     * por esta requisição e é útil para vincular as transações do
     * Boleto Fácil às vendas registradas no seu sistema
     * 
     * **Formato:** Decimal, com 2 casas decimais, separado por ponto. 
     * Maior ou igual a 2.30 e menor ou igual a 1000000.00
     * 
     * **Observações:** Caso o campo seja informado, 
     * o parâmetro installments passa a ser obrigatório, e o campo **amount** não deve ser informado.
     *
     * **Atenção**: Caso seja passado um valor com mais de 2 casas decimais, ele será TRUNCADO. Ex.: 2.419 -> 2.41.
     * A diferença de centavos obtida a partir da divisão de parcelas, será lançada na primeira parcela.
     * Ex.: R$ 10,00 em 3x(sem juros). A 1ª parcela será de R$ 3,34 e as demais serão de R$ 3,33.
     * @type {string}
     * @memberof GerarCobranca
     */
    totalAmount?: string
    /**
     * Valor do boleto ou da parcela no caso de cobrança parcelada
     *
     * Este código fica associado à(s) cobrança(s) criada(s) 
     * por esta requisição e é útil para vincular as transações do
     * Boleto Fácil às vendas registradas no seu sistema
     * 
     * **Formato:** Decimal, com 2 casas decimais, separado por ponto.
     * Maior ou igual a 2.30 e menor ou igual a 1000000.00
     *
     * @type {string}
     * @memberof GerarCobranca
     */
    amount: string
    /**
     * Data de vencimento do boleto ou da primeira parcela, no caso de cobrança parcelada
     * Para parcelamento as prestações terão vencimento com 1 mês de intervalo, a partir da data informada
     * 
     * **Formato:** dd/mm/aaaa  
     * **Valor Padrão:** Se não definido será 3 dias após a data de emissão
     * @type {string}
     * @memberof GerarCobranca
     */
    dueDate?: string
    /**
     * Número de parcelas da cobrança
     * Se igual a 1, será gerado um boleto simples, se 2 ou mais, será gerado um carnê
     * 
     * **Formato:** Número inteiro maior ou igual a 1 e menor ou igual a 24  
     * **Cartão de Crédito:** Se for oferecida a opção de pagamento com cartão de crédito, o número máximo de parcelas será 12.  
     * **Valor Padrão:** 1
     * @type {number}
     * @memberof GerarCobranca
     */
    installments?: number
    /**
     * Número máximo de dias que o boleto poderá ser pago após o vencimento
     * Zero significa que o boleto não poderá ser pago após o vencimento
     *
     * **Formato:** Número inteiro maior ou igual a 0 e menor ou igual a 29  
     * **Valor Padrão:** 0
     * @type {number}
     * @memberof GerarCobranca
     */
    maxOverdueDays?: number
    /**
     * Multa para pagamento após o vencimento
     * Só é efetivo se **maxOverdueDays** for maior que zero
     *
     * **Formato:** Decimal, separado por ponto. Maior ou igual a 0.00 e menor ou igual a 20.00 (2.00 é o valor máximo permitido por lei)  
     * **Valor Padrão:** 0.00
     * @type {string}
     * @memberof GerarCobranca
     */
    fine?: string
    /**
     * Juro mensal para pagamento após o vencimento
     * Só é efetivo se maxOverdueDays for maior que zero
     *
     * **Formato:** Decimal, separado por ponto. Maior ou igual a 0.00 e menor ou igual a 20.00 (1.00 é o valor máximo permitido por lei)  
     * **Valor Padrão:** 0.00
     * @type {string}
     * @memberof GerarCobranca
     */
    interest?: string
    /**
     * Valor do desconto
     *
     * **Formato:** Decimal, separado por ponto. Maior ou igual a 0.00 e menor que o valor da cobrança (amount)  
     * **Valor Padrão:** 0.00
     * @type {string}
     * @memberof GerarCobranca
     */
    discountAmount?: string
    /**
     * Dias concessão de desconto para pagamento antecipado. Exemplo: Até 10 dias antes do vencimento.
     *
     * **Formato:** Número inteiro maior ou igual a -1  
     * **Valor Padrão:** -1
     * **Atenção:** Valor igual a 0 (zero) significa conceder desconto até a data do vencimento
     * @type {number}
     * @memberof GerarCobranca
     */
    discountDays?: number
    /**
     * Define o(s) tipo(s) de pagamento da cobrança
     *
     * **Formato:** BOLETO e/ou CREDIT_CARD
     * **Valor Padrão:** BOLETO
     * **Exemplo:** BOLETO,CREDIT_CARD
     * @type {number}
     * @memberof GerarCobranca
     */
    paymentTypes?: string[]
    /**
     * Define se o pagamento via cartão de crédito será antecipado
     *
     * **Formato:** true ou false
     * **Valor Padrão:** false
     * @type {number}
     * @memberof GerarCobranca
     */
    paymentAdvance?: boolean
    /**
     * Define o esquema de taxas alternativo para uma cobrança específica.
     *
     * Para cobranças criadas com o objeto split, a taxa 
     * da emissão fica a cargo da conta que recebe true no chargeFee.
     * @type {number}
     * @memberof GerarCobranca
     */
    feeSchemaToken?: string
    /**
     * Divisão de valores de recebimento
     *
     * Para cobranças criadas com o objeto split, a taxa 
     * da emissão fica a cargo da conta que recebe true no chargeFee.
     * @type {number}
     * @memberof GerarCobranca
     */
    split?: {
      /**
       * Define os destinatários do split.
       *
       * @type {string}
       */
      recipientToken: string,
      /**
       * Define o valor fixo que a conta vai receber. 
       * Caso seja enviado, não será aceito o parâmetro percentage no objeto split.
       *
       * @type {number}
       */
      amount: number,
      /**
       * Define o valor percentual que a conta vai receber. 
       * Caso seja enviado, não será aceito o parâmetro amount no objeto split.
       *
       * @type {number}
       */
      percentage: number,
      /**
       * Indica quem recebe o valor restante em caso 
       * de uma divisão do valor total da transação.
       *
       * @type {boolean}
       */
      amountRemainder: boolean,
      /**
       * Indica se somente um recebedor será taxado ou se as taxas serão 
       * divididas proporcionalmente entre todos os recebedores.
       *
       * @type {boolean}
       */
      chargeFee: boolean
    }[]
  }
  billing: {
    /**
     * Nome completo do comprador
     *
     * **Formato:** Livre com até 80 caracteres
     * @type {string}
     * @memberof GerarCobranca
     */
    name: string
    /**
     * CPF ou CNPJ do comprador
     *
     * **Formato:** CPF ou CNPJ válido, aceito com ou sem pontuação
     * @type {string}
     * @memberof GerarCobranca
     */
    document: string
    /**
     * Endereço de email do comprador
     *
     * **Formato:** Endereço de email válido, com até 80 caracteres
     * @type {string}
     * @memberof GerarCobranca
     */
    email?: string
    /**
     * Endereço de email secundário do comprador
     *
     * **Formato:** Endereço de email secundário válido, com até 80 caracteres
     * @type {string}
     * @memberof GerarCobranca
     */
    secondaryEmail?: string
    /**
     * Telefone do comprador
     *
     * **Formato:** Livre com até 25 caracteres
     * @type {string}
     * @memberof GerarCobranca
     */
    phone?: string
    /**
     * Nome da rua/logradouro do comprador
     *
     * **Formato:** Livre com até 100 caracteres
     * @type {string}
     * @memberof GerarCobranca
     */
    birthDate?: string
    /**
     * Define se o Juno enviará emails de notificação sobre esta cobrança para o comprador
     * O email com o boleto ou carnê só será enviado ao comprador se este parâmetro for igual a **true** e o endereço de email do comprador estiver presente
     * O lembrete de vencimento só será enviado se as condições acima forem verdadeiras e se na configuração do Favorecido os lembretes estiverem ativados
     *
     * **Formato:** true ou false  
     * **Valor padrão:** true
     * @type {boolean}
     * @memberof GerarCobranca
     */
    notify?: boolean
  }
}

/**
 * Criar Plano @payload
 *
 * @export
 * @interface CriarPlano
 */
export interface CriarPlano {
  /**
   * Nome do Plano
   *
   * @type {string}
   * @memberof CriarPlano
   */
  name: string
  /**
   * Valor, ex.: 100.00
   *
   * @type {string}
   * @memberof CriarPlano
   */
  amount: string
}

/**
 * Listar Cobrancas - @query
 *
 * @export
 * @interface QueryListarCobrancas
 */
export interface QueryListarCobrancas {
  /**
   * Example: createdOnStart=yyyy-MM-dd
   * Busca pela criação da cobrança a partir dessa data
   *
   * @type {string}
   * @memberof QueryListarCobrancas
   */
  createdOnStart?: string
  /**
   * Example: createdOnEnd=yyyy-MM-dd
   * Busca pela criação da cobrança até
   *
   * @type {string}
   * @memberof QueryListarCobrancas
   */
  createdOnEnd?: string
  /**
   * Example: dueDateStart=yyyy-MM-dd
   * Busca por vencimentos a partir dessa data
   *
   * @type {string}
   * @memberof QueryListarCobrancas
   */
  dueDateStart?: string
  /**
   * Example: dueDateEnd=yyyy-MM-dd 
   * Busca por vencimentos a partir até essa data
   *
   * @type {string}
   * @memberof QueryListarCobrancas
   */
  dueDateEnd?: string
  /**
   * Example: paymentDateStart=yyyy-MM-dd
   * Busca por pagamentos a partir dessa data
   *
   * @type {string}
   * @memberof QueryListarCobrancas
   */
  paymentDateStart?: string
  /**
   * Example: paymentDateEnd=yyyy-MM-dd
   * Busca por pagamentos até essa data
   *
   * @type {string}
   * @memberof QueryListarCobrancas
   */
  paymentDateEnd?: string
  /**
   * Mostra cobranças que não foram ou estão arquivadas
   *
   * @type {boolean}
   * @memberof QueryListarCobrancas
   */
  showUnarchived?: boolean
  /**
   * Mostra cobranças que não foram ou estão arquivadas 
   *
   * @type {boolean}
   * @memberof QueryListarCobrancas
   */
  showArchived?: boolean
  /**
   * Mostra cobranças que foram ou estão arquivadas
   *
   * @type {boolean}
   * @memberof QueryListarCobrancas
   */
  showDue?: boolean
  /**
   * Mostra cobranças vencidas
   *
   * @type {boolean}
   * @memberof QueryListarCobrancas
   */
  showNotDue?: boolean
  /**
   * Mostra cobranças que não estão vencidas
   *
   * @type {boolean}
   * @memberof QueryListarCobrancas
   */
  showPaid?: boolean
  /**
   * Mostra cobranças pagas
   *
   * @type {boolean}
   * @memberof QueryListarCobrancas
   */
  showNotPaid?: boolean
  /**
   * Mostra cobranças que não estão pagas
   *
   * @type {boolean}
   * @memberof QueryListarCobrancas
   */
  showCancelled?: boolean
  /**
   * Mostra cobranças canceladas
   *
   * @type {boolean}
   * @memberof QueryListarCobrancas
   */
  showNotCancelled?: boolean
  /**
   * Mostra cobranças que foram baixadas manualmente
   *
   * @type {boolean}
   * @memberof QueryListarCobrancas
   */
  showManualReconciliation?: boolean
  /**
   * Mostra cobranças que não foram baixadas manualmente
   *
   * @type {boolean}
   * @memberof QueryListarCobrancas
   */
  showNotManualReconciliation?: boolean
  /**
   * Mostra cobranças que tiveram falha no pagamento. (Checkout transparente)
   *
   * @type {boolean}
   * @memberof QueryListarCobrancas
   */
  showNotFailed?: boolean
  /**
   * Enum: "id" "dueDate" "amount" "paymentDate"
   * Ordenação cobranças pelos filtros id, dueDate, amount e paymentDate
   *
   * @type {string}
   * @memberof QueryListarCobrancas
   */
  orderBy?: string
  /**
   * Ordenação cobranças ascendente ou descentente
   *
   * @type {string}
   * @memberof QueryListarCobrancas
   */
  orderAsc?: string
  /**
   * Quantidade de cobranças por página
   *
   * @type {number}
   * @memberof QueryListarCobrancas
   */
  pageSize?: number
  /**
   * Número identificador da página
   *
   * @type {number}
   * @memberof QueryListarCobrancas
   */
  page?: number
  /**
   * Define a partir de qual objeto charge será feita a busca
   *
   * @type {string}
   * @memberof QueryListarCobrancas
   */
  firstObjectId?: string
  /**
   * Define a partir de qual valor será feita a busca
   *
   * @type {string}
   * @memberof QueryListarCobrancas
   */
  firstValue?: string
  /**
   * Define até qual objeto charge será feita a busca
   *
   * @type {string}
   * @memberof QueryListarCobrancas
   */
  lastObjectId?: string
  /**
   * Define até qual valor será feita a busca
   *
   * @type {string}
   * @memberof QueryListarCobrancas
   */
  lastValue?: string
}

/**
 * Config Settings - @settings
 *
 * @export
 * @interface Config
 */
export interface Config {
  mode: string;
  clientId: string;
  clienteSecret: string;
  token: string;
}

/**
 * Cliente Headers - @headers @api
 *
 * @interface Headers
 */
export interface Headers {
  Authorization: string;
  'X-Api-Version': number;
}

export type Gestao = {
  dadosAdicionais: DadosAdicionais
  saldo: Saldo
  contasDigitais: ContasDigitais
}

export type Transacao = {
  cobrancas: Cobrancas
  assinatura: Assinatura
}

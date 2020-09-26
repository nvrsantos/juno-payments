/* eslint-disable no-trailing-spaces */

interface GerarBoleto {
  /**
   * O token do Favorecido, que pode ser gerado acima
   *
   * @type {string}
   * @memberof IGerarBoleto
   */
  token: string
  /**
   * Descrição sobre a que se refere o pagamento
   *
   * **Formato:** Livre com até 400 caracteres - Até 4 linhas  
   * **Exemplos:** Pedido 48192 / TV 40 Polegadas / Cosméticos
   *
   * @type {string}
   * @memberof IGerarBoleto
   */
  description: string
  /**
   * Código de referência da cobrança
   *
   * Este código fica associado à(s) cobrança(s) criada(s) 
   * por esta requisição e é útil para vincular as transações do
   * Boleto Fácil às vendas registradas no seu sistema
   * 
   * **Formato:** Livre com até 255 caracteres
   *
   * @type {string}
   * @memberof IGerarBoleto
   */
  reference: string
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
   * @memberof IGerarBoleto
   */
  amount: string
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
   * @memberof IGerarBoleto
   */
  totalAmount?: string
  /**
   * Data de vencimento do boleto ou da primeira parcela, no caso de cobrança parcelada
   * Para parcelamento as prestações terão vencimento com 1 mês de intervalo, a partir da data informada
   * 
   * **Formato:** dd/mm/aaaa  
   * **Valor Padrão:** Se não definido será 3 dias após a data de emissão
   * @type {string}
   * @memberof IGerarBoleto
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
   * @memberof IGerarBoleto
   */
  installments?: number
  /**
   * Número máximo de dias que o boleto poderá ser pago após o vencimento
   * Zero significa que o boleto não poderá ser pago após o vencimento
   *
   * **Formato:** Número inteiro maior ou igual a 0 e menor ou igual a 29  
   * **Valor Padrão:** 0
   * @type {number}
   * @memberof IGerarBoleto
   */
  maxOverdueDays?: number
  /**
   * Multa para pagamento após o vencimento
   * Só é efetivo se **maxOverdueDays** for maior que zero
   *
   * **Formato:** Decimal, separado por ponto. Maior ou igual a 0.00 e menor ou igual a 20.00 (2.00 é o valor máximo permitido por lei)  
   * **Valor Padrão:** 0.00
   * @type {string}
   * @memberof IGerarBoleto
   */
  fine?: string
  /**
   * Juro mensal para pagamento após o vencimento
   * Só é efetivo se maxOverdueDays for maior que zero
   *
   * **Formato:** Decimal, separado por ponto. Maior ou igual a 0.00 e menor ou igual a 20.00 (1.00 é o valor máximo permitido por lei)  
   * **Valor Padrão:** 0.00
   * @type {string}
   * @memberof IGerarBoleto
   */
  interest?: string
  /**
   * Valor do desconto
   *
   * **Formato:** Decimal, separado por ponto. Maior ou igual a 0.00 e menor que o valor da cobrança (amount)  
   * **Valor Padrão:** 0.00
   * @type {string}
   * @memberof IGerarBoleto
   */
  discountAmount?: string
  /**
   * Dias concessão de desconto para pagamento antecipado. Exemplo: Até 10 dias antes do vencimento.
   *
   * **Formato:** Número inteiro maior ou igual a -1  
   * **Valor Padrão:** -1
   * **Atenção:** Valor igual a 0 (zero) significa conceder desconto até a data do vencimento
   * @type {number}
   * @memberof IGerarBoleto
   */
  discountDays?: number
  /**
   * Nome completo do comprador
   *
   * **Formato:** Livre com até 80 caracteres
   * @type {string}
   * @memberof IGerarBoleto
   */
  payerName: string
  /**
   * CPF ou CNPJ do comprador
   *
   * **Formato:** CPF ou CNPJ válido, aceito com ou sem pontuação
   * @type {string}
   * @memberof IGerarBoleto
   */
  payerCpfCnpj: string
  /**
   * Endereço de email do comprador
   *
   * **Formato:** Endereço de email válido, com até 80 caracteres
   * @type {string}
   * @memberof IGerarBoleto
   */
  payerEmail?: string
  /**
   * Endereço de email secundário do comprador
   *
   * **Formato:** Endereço de email secundário válido, com até 80 caracteres
   * @type {string}
   * @memberof IGerarBoleto
   */
  payerSecondaryEmail?: string
  /**
   * Telefone do comprador
   *
   * **Formato:** Livre com até 25 caracteres
   * @type {string}
   * @memberof IGerarBoleto
   */
  payerPhone?: string
  /**
   * Telefone do comprador
   *
   * **Formato:** Livre com até 25 caracteres
   * @type {string}
   * @memberof IGerarBoleto
   */
  payerBirthDate: string
  /**
   * Nome da rua/logradouro do comprador
   *
   * **Formato:** Livre com até 100 caracteres
   * @type {string}
   * @memberof IGerarBoleto
   */
  billingAddressStreet?: string
  /**
   * Número da residência do comprador
   *
   * **Formato:** Livre com até 30 caracteres
   * @type {string}
   * @memberof IGerarBoleto
   */
  billingAddressNumber?: string
  /**
   * Complemento do endereço do comprador
   *
   * **Formato:** Livre com até 50 caracteres
   * @type {string}
   * @memberof IGerarBoleto
   */
  billingAddressComplement?: string
  /**
   * Bairro do endereço do comprador
   *
   * **Formato:** Livre com até 50 caracteres
   * @type {string}
   * @memberof IGerarBoleto
   */
  billingAddressNeighborhood?: string
  /**
   * Cidade comprador
   *
   * **Formato:** Livre com até 60 caracteres
   * @type {string}
   * @memberof IGerarBoleto
   */
  billingAddressCity?: string
  /**
   * Estado do comprador
   *
   * **Formato:** Nome do estado ou UF válida
   * @type {string}
   * @memberof IGerarBoleto
   */
  billingAddressState?: string
  /**
   * CEP do comprador
   *
   * **Formato:** CEP válido com ou sem hífen
   * @type {string}
   * @memberof IGerarBoleto
   */
  billingAddressPostcode?: string
  /**
   * Define se o Boleto Fácil enviará emails de notificação sobre esta cobrança para o comprador
   * O email com o boleto ou carnê só será enviado ao comprador se este parâmetro for igual a **true** e o endereço de email do comprador estiver presente
   * O lembrete de vencimento só será enviado se as condições acima forem verdadeiras e se na configuração do Favorecido os lembretes estiverem ativados
   *
   * **Formato:** true ou false
   * **Valor padrão:** true
   * @type {string}
   * @memberof IGerarBoleto
   */
  notifyPayer?: boolean
  /**
   * Define uma URL de notificação para que o Boleto Fácil envie notificações ao seu sistema sempre que houver algum evento de pagamento desta cobrança.
   * Se preferir, você pode configurar uma URL de notificação para todas as suas cobranças no tópico ***Notificação de pagamentos***.
   * Se houver uma URL global e uma na cobrança, será utilizada a que foi definida na cobrança.
   *
   * **Formato:** Endereço de URL com até 255 caracteres
   * @type {string}
   * @memberof IGerarBoleto
   */
  notificationUrl: string
  responseType: string
  feeSchemaToken: string
  splitRecipient: string
  paymentTypes: string
  creditCardHash: string
  creditCardStore: string
  creditCardId: string
  paymentAdvance: string
}

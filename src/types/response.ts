/**
 * @SaldoResponse
 *
 * @interface SaldoResponse
 */
export interface SaldoResponse {
  balance: number,
  withheldBalance: number,
  transferableBalance: number,
  _links: {
    self: {
      href: string
    }
  }[]
}

/**
 *
 *
 * @export
 * @interface ListaCobrancaResponse
 */
export interface ListaCobrancaResponse {
  _embedded: {
    charges: {
      id: string,
      code: number,
      reference: string,
      dueDate: string,
      link: string,
      checkoutUrl: string,
      installmentLink: string,
      payNumber: string,
      amount: 0,
      billetDetails: {
        bankAccount: string,
        ourNumber: string,
        barcodeNumber: string,
        portfolio: string
      },
      payments: {
        id: string,
        chargeId: string,
        date: string,
        releaseDate: string,
        amount: number,
        fee: number,
        type: string,
        status: string,
        transactionId: string,
        failReason: string
      }[],
      _links: {
        self: {
          href: string
        }
      }[]
    }[]
  },
  _links: {
    self: {
      href: string
    },
    next: {
      href: string
    },
    previous: {
      href: string
    }
  }[]
}

export interface ConsultarCobrancaResponse {
  id: string,
  code: number,
  reference: string,
  dueDate: string,
  link: string,
  checkoutUrl: string,
  installmentLink: string,
  payNumber: string,
  amount: number,
  billetDetails: {
    bankAccount: string,
    ourNumber: string,
    barcodeNumber: string,
    portfolio: string
  },
  payments: {
    id: string,
    chargeId: string,
    date: string,
    releaseDate: string,
    amount: number
    fee: number
    type: string,
    status: string,
    transactionId: string,
    failReason: string
  }[],
  _links: {
    self: {
      href: string
      }
  }[]
}

export interface CancelarCobrancaResponse {
  timestamp: string,
  status: number,
  error: string,
  details: {
    field: string,
    message: string,
    errorCode: string
  }[]
  path: string
}

/**
 * Gerar Cobrança Response
 *
 * @export
 * @interface GerarCobrancaResponse
 */
export interface GerarCobrancaResponse {
  charge: {
    description: string,
    references: string[],
    totalAmount: string,
    amount: string
    dueDate: string,
    installments: number
    maxOverdueDays: number
    fine: number
    interest: string
    discountAmount: string
    discountDays: number
    paymentTypes: string[]
    paymentAdvance: boolean
    feeSchemaToken: string
    split: {
      recipientToken: string,
      amount: number,
      percentage: number,
      amountRemainder: boolean,
      chargeFee: boolean
    }[]
  }
  billing: {
    name: string
    document: string
    email: string
    secondaryEmail: string
    phone: string
    birthDate: string
    notify: boolean
  }
}

/**
 * All Banks
 *
 * @export
 * @interface BanksRensponse
 */
export interface BanksRensponse {
  _embedded: {
    banks: {
      number: string,
      name: string,
      _links: {
        self: {
          href: string
        }
      }[]
    }[]
  },
  _links: {
    self: {
      href: string
    }
  }[]
}

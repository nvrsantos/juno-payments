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

/**
 * Criar Plano - @response
 *
 * @export
 * @interface CriarPlanoResponse
 */
export interface CriarPlanoResponse {
  id: string
  createdOn: string
  name: string
  frequency: string
  status: string
  amount: number
  _links: {
    href: string
  }[]
}

/**
 * Listar Planos - @response
 *
 * @export
 * @interface ListarPlanosResponse
 */
export interface ListarPlanosResponse {
  _embedded: {
    plans: {
      id: string
      createdOn: string
      name: string
      frequency: string
      status: string
      amount: number
      _links: {
        href: string
      }[]
    }[]
  }
}

/**
 * ConstultarPlanoResponse - @response
 * 
 * @export
 * @interface ConstultarPlanoResponse
 */
export interface ConstultarPlanoResponse {
  id: string,
  createdOn: string,
  name: string,
  frequency: string,
  status: "ACTIVE" | "INACTIVE",
  amount: number,
  _links: [
    {
      href: string
    }
  ]
}

/**
 * CriarAssinaturaResponse - @response
 * 
 * @export
 * @interface CriarAssinaturaResponse
 */
export interface CriarAssinaturaResponse {
  id: string,
  createdOn: string,
  dueDay: string,
  status: string,
  startsOn: string,
  nextBillingDate: string,
  _links: {
    self: {
      href: string
    }
  }
}

/**
 * ListarAssinaturasResponse - @response
 * 
 * @export
 * @interface ListarAssinaturasResponse
 */
export interface ListarAssinaturasResponse {
  _embedded: {
    subscriptions: [
      {
        id: string,
        createdOn: string,
        dueDay: string,
        status: "ACTIVE" | "INACTIVE" | "CANCELED" | "COMPLETED",
        startsOn: string,
        nextBillingDate: string,
        _links: [
          {
            href: string
          }
        ]
      }
    ]
  }
}

/**
 * ConsultarAssinaturaResponse - @response
 * 
 * @export
 * @interface ConsultarAssinaturaResponse
 */
export interface ConsultarAssinaturaResponse {
  id: string,
  createdOn: string,
  dueDay: string,
  status: "ACTIVE" | "INACTIVE" | "CANCELED" | "COMPLETED",
  startsOn: string,
  nextBillingDate: string,
  _links: [
    {
      href: string
    }
  ]
}
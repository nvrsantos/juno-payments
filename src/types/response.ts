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
  _embedded: {
    charges: Array<{
      id: string,
      code: number,
      reference: string,
      dueDate: string,
      link: string,
      checkoutUrl: string,
      installmentLink: string,
      payNumber: string,
      amount: number,
      status: "ACTIVE" | "CANCELLED" | "MANUAL_RECONCILIATION" | "FAILED" | "PAID",

      billetDetails: {
        bankAccount: string,
        ourNumber: string,
        barcodeNumber: string,
        portfolio: string
      },

      payments: Array<{
        id: string,
        chargeId: string,
        date: string,
        releaseDate: string,
        amount: number,
        fee: number,
        type: string,
        status: "CONFIRMED" | string,
        transactionId: string,
        failReason: string
      }>,

      pix: Array<{
        id: string,
        qrcodeInBase64: string,
        imageInBase64: string
      }>,

      _links: Array<{
        self: {
          href: string
        }
      }>
    }>
  },

  _links: Array<{
    self: {
      href: string
    }
  }>
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
 * Constultar Plano - @response
 * 
 * @export
 * @interface ConstultarPlanoResponse
 */
export interface ConstultarPlanoResponse {
  id: string,
  createdOn: string,
  name: string,
  frequency: "MONTHLY",
  status: "ACTIVE" | "INACTIVE" | "CANCELED" | "COMPLETED",
  amount: number,
  _links: Array<{
    href: string
  }>
}

/**
 * Criar Assinatura - @response
 * 
 * @export
 * @interface CriarAssinaturaResponse
 */
export interface CriarAssinaturaResponse {
  id: string,
  createdOn: string,
  dueDay: string,
  status: "ACTIVE" | "INACTIVE" | "CANCELED" | "COMPLETED",
  startsOn: string,
  nextBillingDate: string,
  _links: Array<{
    href: string
  }>
}

/**
 * Listar Assinaturas - @response
 * 
 * @export
 * @interface ListarAssinaturasResponse
 */
export interface ListarAssinaturasResponse {
  _embedded: {
    subscriptions: Array<{
      id: string,
      createdOn: string,
      dueDay: string,
      status: "ACTIVE" | "INACTIVE" | "CANCELED" | "COMPLETED",
      startsOn: string,
      nextBillingDate: string,
      _links: Array<{
        href: string
      }>
    }>
  }
}

/**
 * Consultar Assinatura - @response
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
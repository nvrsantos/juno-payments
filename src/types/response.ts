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

export interface CreatedPayment {
  charges: {
    id: string;
    code: number;
    reference: string;
    dueDate: string;
    link: string;
    checkoutUrl: string;
    installmentLink: string;
    payNumber: string;
    amount: number;
    billetDetails: {
      bankAccount: string;
      ourNumber: string;
      barcodeNumber: string;
      portfolio: string;
    };
    payments: {
      id: string;
      chargeId: string;
      date: string;
      releaseDate: string;
      amount: number;
      fee: number;
      type: string;
      status: string;
      transactionId: string;
      failReason: string;
    }[];
    _links: {
      self: {
        href: string;
      };
    }[]
  }[]
}

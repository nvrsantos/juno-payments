import { JunoCardHash } from 'juno-nodejs'
import { Authentication } from '../authentication'
import { GerarHashCartao } from '../types/interface'

/**
 * Pagamentos - @Cobranca
 * 
 * @class Pagamentos
 */
class Pagamentos {
    private auth: Authentication
    private url: string
    private token: string
    private env: 'sandbox' | 'production' = 'sandbox'

    constructor(auth: Authentication, url: string, token: string, mode: string) {
        this.auth = auth
        this.url = url
        this.token = token
        this.env = mode === 'dev' ? 'sandbox' : 'production'
    }

    public async gerarHash(card: GerarHashCartao): Promise<string> {
        try {
            const service = new JunoCardHash('F97F2028EDD904801486E23DD8662D38897B558D650520FC23FBCA786368398C', 'sandbox')
            const hash: string = await service.getCardHash(card)

            return hash

        } catch (error) {
            throw new Error(error)
        }
    }
}

export { Pagamentos }
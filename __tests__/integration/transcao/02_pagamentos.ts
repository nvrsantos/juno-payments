import Juno from './../../../src/index'

export function pagamentos(juno: Juno): void {
    describe('Pagamentos - Transação', () => {
        test('Gerar Hash do Cartão', async (done) => {
            try {
                const result = await juno.transacao.pagamentos.gerarHash({
                    holderName: "José da Silva",
                    cardNumber: "5359991737400750",
                    securityCode: '000',
                    expirationMonth: '12',
                    expirationYear: '2025',
                })

                expect(result).toBeTruthy()
                done()
            } catch (error) {
                done(error)
            }
        })
    })
}
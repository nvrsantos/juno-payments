import Juno from '../../../src'

export function assinaturas(juno: Juno): void {
    describe('Assinaturas - Transação', () => {
        test('Criar Planos', async (done) => {
            try {
                const result = await juno.transacao.assinatura.criarPlano({
                    name: 'Plano Teste',
                    amount: '15.00'
                })
                expect(result.id).toBeTruthy()
                done()
            } catch (error) {
                done(error)
            }
        })

        test('Listar Planos', async (done) => {
            try {
                const result = await juno.transacao.assinatura.listarPlanos()

                expect(result._embedded.plans[0].id).toBeTruthy()
                done()
            } catch (error) {
                done(error)
            }
        })

        test('Consultar Planos', async (done) => {
            try {
                const lista = await juno.transacao.assinatura.listarPlanos()
                const result = await juno.transacao.assinatura.consultarPlano(lista._embedded.plans[0].id)

                expect(result).toBeTruthy()
                done()
            } catch (error) {
                done(error)
            }
        })

        test('Criar Assinatura', async (done) => {
            try {
                const lista = await juno.transacao.assinatura.listarPlanos()
                const creditCardHash = await juno.transacao.pagamentos.gerarHash({
                    holderName: "Cliente Comprador X",
                    cardNumber: "4876475938242192",
                    securityCode: '000',
                    expirationMonth: '12',
                    expirationYear: '2025',
                })

                const result = await juno.transacao.assinatura.criarAssinatura({
                    dueDay: 17,
                    planId: lista._embedded.plans[0].id,
                    chargeDescription: 'Assinatura TESTE',
                    creditCardDetails: { creditCardHash },
                    billing: {
                        name: 'Cliente Comprador X',
                        document: '06983532422'
                    }
                })

                expect(result).toBeTruthy()
                done()
            } catch (error) {
                done(error)
            }
        })

        test('Listar Assinaturas', async (done) => {
            try {
                const lista = await juno.transacao.assinatura.listarAssinaturas()

                expect(lista._embedded.subscriptions[0].id).toBeTruthy()
                done()
            } catch (error) {
                done(error)
            }
        })

        test('Consultar Assinatura', async (done) => {
            try {
                const lista = await juno.transacao.assinatura.listarAssinaturas()
                const result = await juno.transacao.assinatura.consultarAssinatura(lista._embedded.subscriptions[0].id)

                expect(result).toBeTruthy()
                done()
            } catch (error) {
                done(error)
            }
        })

        test('Desativar Assinatura', async (done) => {
            try {
                const lista = await juno.transacao.assinatura.listarAssinaturas()
                const result = await juno.transacao.assinatura.desativarAssinatura(lista._embedded.subscriptions[0].id)

                expect(result).toBeTruthy()
                done()
            } catch (error) {
                done(error)
            }
        })

        test('Reativar Assinatura', async (done) => {
            try {
                const lista = await juno.transacao.assinatura.listarAssinaturas()
                const result = await juno.transacao.assinatura.reativarAssinatura(lista._embedded.subscriptions[0].id)

                expect(result).toBeTruthy()
                done()
            } catch (error) {
                done(error)
            }
        })

        test('Cancelar Assinatura', async (done) => {
            try {
                const lista = await juno.transacao.assinatura.listarAssinaturas()
                const result = await juno.transacao.assinatura.cancelarAssinatura(lista._embedded.subscriptions[0].id)

                expect(result).toBeTruthy()
                done()
            } catch (error) {
                done(error)
            }
        })
        
    })
}
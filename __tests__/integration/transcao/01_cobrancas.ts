import Juno from './../../../src/index'

export function cobrancas(juno: Juno): void {
    describe('Cobranças - Transação', () => {
        test('Gerar Cobranças', async (done) => {
            try {
                const result = await juno.transacao.cobrancas.gerarCobranca({
                    charge: {
                        amount: '15.00',
                        description: 'Compra de Produto X'
                    },
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

        test('Listar Cobranças', async (done) => {
            try {
                const result = await juno.transacao.cobrancas.listarCobrancas({})
                expect(result._embedded.charges[0]).toBeTruthy()
                done()
            } catch (error) {
                done(error)
            }
        })

        test('Consultar cobrança', async (done) => {
            try {
                const lista = await juno.transacao.cobrancas.listarCobrancas({})
                const result = await juno.transacao.cobrancas.consultarCobranca(lista._embedded.charges[0].id)

                expect(result.amount).toBeTruthy()
                done()
            } catch (error) {
                done(error)
            }
        })

        test('Cancelar cobrança', async (done) => {
            try {
                const lista = await juno.transacao.cobrancas.listarCobrancas({})
                const result = await juno.transacao.cobrancas.cancelarCobranca(lista._embedded.charges[0].id)

                expect(result).toBe(204)
                done()
            } catch (error) {
                done(error)
            }
        })
    })
}
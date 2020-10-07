import Juno from '../../../src'

export function assinaturas (juno: Juno): void {
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
  })
}

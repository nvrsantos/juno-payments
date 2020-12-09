import Juno from '../../../src'

export function saldo (juno: Juno): void {
  describe('Saldo - Gestão', () => {
    test('Consulta Saldo', async (done) => {
      try {
        const result = await juno.gestao.saldo.consultarSaldo()
        
        expect(result).toBeTruthy()
        done()
      } catch (error) {
        done(error)
      }
    })
  })
}
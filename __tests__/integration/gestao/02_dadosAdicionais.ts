import Juno from '../../../src'

export function dadosAdicionais (juno: Juno): void {
  describe('Dados Adicionais - Gestão', () => {
    test('Lista Bancos', async (done) => {
      try {
        const result = await juno.gestao.dadosAdicionais.listarBancos()
        expect(result.length).toBeGreaterThanOrEqual(1)
        done()
      } catch (error) {
        done(error)
      }
    })

    test('Lista Tipos Empresas', async (done) => {
      try {
        const result = await juno.gestao.dadosAdicionais.listarTiposEmpresa()
        expect(result.length).toBeGreaterThanOrEqual(1)
        done()
      } catch (error) {
        done(error)
      }
    })
  })
}

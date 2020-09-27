import Juno from "../../../src";

export async function dadosAdicionais(juno: Juno) {
  describe('Dados Adicionais - Gestão', () => {
    test("Lista Bancos", async (done) => {
      try {
        const result = await juno.dadosAdicionais.listarBancos()
        expect(result.length).toBeGreaterThanOrEqual(1)
        done();
      } catch (error) {
        done(error);
      }
    });
  
    test("Lista Tipos Empresas", async (done) => {
      try {
        const result = await juno.dadosAdicionais.listarTiposEmpresa()
        expect(result.length).toBeGreaterThanOrEqual(1)
        done();
      } catch (error) {
        done(error);
      }
    });
  })
}
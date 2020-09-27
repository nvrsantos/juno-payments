import Juno from "../../../src";

export async function cobrancas(juno: Juno) {
  describe('Cobranças - Transação', () => {
    test("Gerar Cobranças - Cobranças", async (done) => {
      try {
        const result = await juno.cobrancas.gerarCobranca({
          charge: {
            amount: '15.00',
            description: 'Compra de Produto X'
          },
          billing: {
            name: "Cliente Comprador X",
            document: '06983532422'
          }
        })
        expect(result).toBeTruthy()
        done();
      } catch (error) {
        done(error);
      }
    });  
  })
}
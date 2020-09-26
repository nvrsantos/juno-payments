import 'dotenv/config'
import Juno from "../../src/index";

const juno = new Juno({
  clientId: process.env.CLIENT_ID,
  clienteSecret: process.env.CLIENT_SECRET,
  mode: 'dev',
  token: process.env.TOKEN
})

beforeAll(() => {});

describe("Init", () => {
  test("Lista Bancos - Dados Adicionais", async (done) => {
    try {
      const result = await juno.listarBancos()
      expect(result.length).toBeGreaterThanOrEqual(1)
      done();
    } catch (error) {
      done(error);
    }
  });

  test("Lista Tipos Empresas - Dados Adicionais", async (done) => {
    try {
      const result = await juno.listarTiposEmpresa()
      expect(result.length).toBeGreaterThanOrEqual(1)
      done();
    } catch (error) {
      done(error);
    }
  });

  test("Gerar Cobranças - Cobranças", async (done) => {
    try {
      const result = await juno.gerarCobranca({
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


  test("Consulta Saldo - Saldo", async (done) => {
    try {
      const result = await juno.consultarSaldo()
      expect(result.balance).toBeTruthy()
      done();
    } catch (error) {
      done(error);
    }
  });
});

afterAll(() => {});

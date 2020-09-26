import respExpress from "../../src/index";
import axios from "axios";
import * as queryString from 'query-string'
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
  test("Contas Digitais - Consultar Conta Digital", async (done) => {
    try {
      const result = await juno.listarBancos()
      expect(result.length).toBeGreaterThanOrEqual(1)
      done();
    } catch (error) {
      done(error);
    }
  });


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
      console.log(result)
      done();
    } catch (error) {
      done(error);
    }
  });
});

afterAll(() => {
});

import "dotenv/config";
import Juno from "../../src/index";
import { contasDigitais } from "./gestao/01_contasDigitais";
import { dadosAdicionais } from "./gestao/02_dadosAdicionais";
import { saldo } from "./gestao/05_saldo";
import { cobrancas } from "./transcao/01_cobrancas";

const juno = new Juno({
    clientId: process.env.CLIENT_ID,
    clienteSecret: process.env.CLIENT_SECRET,
    mode: "dev",
    token: process.env.TOKEN,
});
export { juno };

beforeAll(() => {});

describe("Init", () => {
  contasDigitais(juno)
  dadosAdicionais(juno)
  saldo(juno)
  
  cobrancas(juno)
});

afterAll(() => {});

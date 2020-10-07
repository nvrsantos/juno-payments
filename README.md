# Juno Payments - (Não Oficial)
Library para integração de pagamentos Juno (antigo boleto fácil), está library não é oficial e tem como objetivo facilitar integração com a API v2 da Juno, contribuições são bem vindas


## Install
```shell
npm install juno-payments

// or

yarn add juno-payments
```

## Como Utilizar
```js
import juno from 'juno-payments'

const juno = new Juno({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  mode: 'dev',
  token: process.env.TOKEN
})

async function getSaldo () {
  try {
    const result = await juno.gestao.saldo.consultarSaldo()
    return result
  } catch (error) {
      throw new Error(error)
  }
}

// then/catch
getSaldo().then(resp => {
  console.log(resp)
}).catch((err) => {
  console.error(err)
})
```
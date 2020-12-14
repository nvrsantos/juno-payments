import { GerarHashCartao } from '../types/interface'

import axios, { AxiosInstance } from 'axios'
import { decode } from 'base-64'
import * as qs from 'query-string'
import crypto = require('isomorphic-webcrypto')

/**
 * Pagamentos - @Cobranca
 * 
 * @class Pagamentos
 */
class Pagamentos {
    private axios: AxiosInstance
    private token: string
    private env: 'sandbox' | 'production' = 'sandbox'

    constructor(token: string, mode: string) {
        this.axios = this._getUrl(this.env)
        this.token = token
        this.env = mode === 'dev' ? 'sandbox' : 'production'
    }

    public async gerarHash(card: GerarHashCartao): Promise<string> {
        try {
            const publicKey = await this._fetchPublicKey()
            const binaryKey = await this._getBinaryKey(publicKey)
            const encriptedPublicKey = await this._importKey(binaryKey)

            const cardBuffer = await this._str2ab(JSON.stringify(card))
            const encriptedCard = await this._encryptCardData(encriptedPublicKey, cardBuffer)

            const result = await this._fetchCardHash(encriptedCard)

            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    private _getAlgorithm() {
        return {
            name: 'RSA-OAEP',
            hash: { name: 'SHA-256' }
        }
    }

    private _getUrl(env: 'sandbox' | 'production') {
        const baseURL = (env === 'sandbox')
            ? "https://sandbox.boletobancario.com/boletofacil/integration/api"
            : "https://www.boletobancario.com/boletofacil/integration/api";

        const instance = axios.create({
            baseURL,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        instance.interceptors.response.use(({ data }) => data);

        return instance;
    }

    private async _fetchPublicKey(): Promise<string> {
        try {
            const params = qs.stringify({ publicToken: this.token })

            const result = await this.axios.post(`/get-public-encryption-key.json?${params}`)

            return result.data.replace(/(\r\n|\n|\r)/gm, "")
        } catch (error) {
            throw new Error(error.response.data.error || 'Erro ao gerar a chave pública na API de pagamentos.')
        }

    }

    private async _fetchCardHash(encryptedCard: string) {
        const params = qs.stringify({ publicToken: this.token, encryptedData: encryptedCard});

        const result = await this.axios.post(`/get-credit-card-hash.json?${params}`)

        if (!result.data) throw new Error('Não foi possível gerar o hash do cartão')

        return result.data
    }

    private _getBinaryKey(encodedKey: string) {
        const decodedKey = decode(encodedKey)
        const binaryKey = this._str2ab(decodedKey)

        return binaryKey
    }

    private _str2ab(str: string) {
        const buf = new ArrayBuffer(str.length)
        const bufView = new Uint8Array(buf)

        for (let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }

        return buf
    }

    private _importKey(binaryKey: JsonWebKey | ArrayBuffer): Promise<CryptoKey> {
        const algorithm = this._getAlgorithm()

        return new Promise((resolve, reject) => {
            crypto.subtle
                .importKey("spki", binaryKey, algorithm, false, ['encrypt'])
                .then(resolve, reject)
        })
    }

    private async _encryptCardData(publicKey: CryptoKey, encodedCardData: ArrayBuffer): Promise<string> {
        const algorithm = this._getAlgorithm()

        return new Promise((resolve, reject) =>
            crypto.subtle
                .encrypt(algorithm, publicKey, encodedCardData)
                .then((data: ArrayBuffer) => this._encodeAb(data))
                .then((encoded: string) => resolve(encoded))
                .catch(reject)
        );
    }

    private _encodeAb(arrayBuffer: ArrayBuffer): string {
        let base64 = "";
        const encodings =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

        const bytes = new Uint8Array(arrayBuffer);
        const { byteLength } = bytes;
        const byteRemainder = byteLength % 3;
        const mainLength = byteLength - byteRemainder;

        let a;
        let b;
        let c;
        let d;
        let chunk;

        // Main loop deals with bytes in chunks of 3
        for (let i = 0; i < mainLength; i += 3) {
            // Combine the three bytes into a single integer
            chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

            // Use bitmasks to extract 6-bit segments from the triplet
            a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
            b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
            c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
            d = chunk & 63; // 63       = 2^6 - 1

            // Convert the raw binary segments to the appropriate ASCII encoding
            base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
        }

        // Deal with the remaining bytes and padding
        if (byteRemainder == 1) {
            chunk = bytes[mainLength];

            a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

            // Set the 4 least significant bits to zero
            b = (chunk & 3) << 4; // 3   = 2^2 - 1

            base64 += `${encodings[a] + encodings[b]}==`;
        } else if (byteRemainder == 2) {
            chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

            a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
            b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

            // Set the 2 least significant bits to zero
            c = (chunk & 15) << 2; // 15    = 2^4 - 1

            base64 += `${encodings[a] + encodings[b] + encodings[c]}=`;
        }

        return base64;
    }
}

export { Pagamentos }
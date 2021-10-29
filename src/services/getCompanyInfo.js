const cnpjFormat = require('../utils/cnpjFormat')
const axios = require('axios')

const api = axios.create({
    baseURL: 'https://www.receitaws.com.br'
})

module.exports = async (_cnpj) => {
    try {
        const cnpj = cnpjFormat(_cnpj)
        const response = await api.get(`/v1/cnpj/${cnpj}`)
        return response.data
    }
    catch (e) {
        if (e.response.status === 429) {
            return {
                "error": 'Muitas requisições, maxímo de 3 consultas de cnpj por minuto.\nTente depois.'
            }
        }
        return {
            "error": `Não foi possível encontrar o cnpj ${_cnpj}!`
        }
    }
}
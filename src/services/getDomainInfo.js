const urlFormat = require('../utils/urlFormat')

const whois = require('whois-json')

module.exports = async (url) => {

    const response = await whois(urlFormat(url))

    if (!response.domainName && !response.domain) {
        return { error: '\x1b[41m\x1b[1m ERRO \x1b[0m -> Esse domínio não existe!\n' }
    }

    const itsNotABrDomain = response.registrantCountry
    if (itsNotABrDomain) {
        if (itsNotABrDomain.split(' ')[0] != 'BR') {
            return { error: '\x1b[41m\x1b[1m ERRO \x1b[0m -> Esse domínio não é Brasileiro\n' }
        }
    }

    if (response.error) return {
        error: '\x1b[41m\x1b[1m ERRO \x1b[0m -> Erro ao tentar obter informações sobre esse domínio!\n'
    }

    return response
}
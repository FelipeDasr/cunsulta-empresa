const { isCnpj } = require('validator-brazil')

module.exports = (_cnpj) => {

    let cnpj = _cnpj

    if (isCnpj(cnpj)) {
        return cnpj.replaceAll('.', '').replaceAll('-', '').replaceAll('/', '')
    }
    return false
}
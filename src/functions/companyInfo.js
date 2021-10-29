const getCompanyInfoTable = require('../tables/getCompanyInfoTable')
const getCnpjInfo = require('../services/getCompanyInfo')

const { isCnpj } = require('validator-brazil')

const inquirer = require('inquirer')
const logo = require('./logo')

module.exports = () => {

    const input = {
        name: 'cnpj',
        message: 'CNPJ:'
    }

    return inquirer.prompt([input]).then(async res => {
        const id = res.cnpj
        if (isCnpj(id)) {
            const companyData = await getCnpjInfo(id)

            if (companyData.error) {
                logo(1)
                return console.log(`\x1b[41m\x1b[1m ERRO \x1b[0m -> ${companyData.error}!\n`)
            }
            
            const companyInfoTable = getCompanyInfoTable(companyData)
            console.log(`\n\n${companyInfoTable}\n\n`)
        } else {
            logo(1)
            console.log('\x1b[41m\x1b[1m ERRO \x1b[0m -> Cnpj inválido!\n')
        }

    }).catch(err => {
        logo(1)
        console.log('\nErro ao tentar capturar sua resposta!\n')
    })
}
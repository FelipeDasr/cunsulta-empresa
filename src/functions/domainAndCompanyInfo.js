const getCompanyInfoTable = require('../tables/getCompanyInfoTable')
const getDomainInfoTable = require('../tables/getDomainInfoTable')

const getDomainInfo = require('../services/getDomainInfo')
const getCompanyInfo = require('../services/getCompanyInfo')

const { isCnpj, isCpf } = require('validator-brazil')

const inquirer = require('inquirer')
const logo = require('./logo')

module.exports = () => {

    const input = {
        name: 'domainUrl',
        message: 'Endereço do domínio:'
    }

    return inquirer.prompt([input]).then(async res => {

        domainData = await getDomainInfo(res.domainUrl)

        if (domainData.error) {
            return console.log(logo(1) + domainData.error)
        }

        const domainInfoTable = getDomainInfoTable(domainData)
        console.log(`\n\n${domainInfoTable}`)

        const id = domainData.ownerid
        if (isCnpj(id)) {
            const companyData = await getCompanyInfo(id)

            if (companyData.error) {
                return console.log(`\n\x1b[41m\x1b[1m ERRO \x1b[0m -> ${companyData.error}!\n`)
            }

            const companyInfoTable = getCompanyInfoTable(companyData)
            console.log(`\n\n${companyInfoTable}\n\n`)
        } else {
            console.log('\n\n Nenhum CNPJ vinculado à esse domínio!\n\n')
        }

    }).catch(err => {
        logo(1)
        console.log('\nErro ao tentar capturar sua resposta!\n')
    })
}
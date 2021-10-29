const getDomainInfoTable = require('../tables/getDomainInfoTable')
const getDomainInfo = require('../services/getDomainInfo')

const inquirer = require('inquirer')
const logo = require('./logo')

module.exports = () => {

    const input = {
        name: 'domainUrl',
        message: 'Endereço do domínio:'
    }

    return inquirer.prompt([input]).then(async res => {

        domainData = await getDomainInfo(res.domainUrl)
        if (domainData.error) return console.log(logo(1) + domainData.error)

        console.log(`\n\n${getDomainInfoTable(domainData)}`)

    }).catch(err => {
        logo(1)
        console.log('\nErro ao tentar capturar sua resposta!\n')
    })
}
const domainAndCompanyInfo = require('./functions/domainAndCompanyInfo')
const companyInfo = require('./functions/companyInfo')
const domainInfo = require('./functions/domainInfo')
const logo = require('./functions/logo')

const inquirer = require('inquirer')

const main = async () => {

    const question = {
        name: 'option',
        message: 'O que você deseja?, escolha uma das opções!',
        type: 'list',
        choices: [
            new inquirer.Separator(' '),
            { name: 'Informações sobre domínio e vínculo empresarial.', value: 0 },
            { name: 'Informações sobre domínio', value: 1 },
            { name: 'Informações de um cnpj', value: 2 },
            new inquirer.Separator(' '),
            { name: 'Limpar tela', value: 98 },
            { name: 'Sair', value: 99 }
        ],
    }

    logo(1)

    console.log('\nDesenvolvido por \033[1;92mFelipe Dasr\x1b[0m\n')

    while (true) {
        await inquirer.prompt([question]).then(async res => {

            switch (res.option) {
                case 0:
                    await domainAndCompanyInfo()
                    break

                case 1:
                    await domainInfo()
                    break

                case 2:
                    await companyInfo()
                    break

                case 98:
                    logo(1)
                    break

                case 99:
                    console.clear()
                    process.exit()
            }

        }).catch(err => {
            logo(1)
            console.log('\nErro ao tentar capturar sua resposta!')
        })
    }
}

main()
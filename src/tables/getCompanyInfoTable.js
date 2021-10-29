const CliTable = require('cli-table')

module.exports = (data) => {

    const nestedTables = new CliTable()
    const infoTable = new CliTable()
    const mainActivityTable = new CliTable({
        head: ['\x1b[1mAtividade\x1b[0m', '\x1b[1mCódigo\x1b[0m']
    })
    const secondaryActivitiesTable = new CliTable({
        head: ['\x1b[1mAtividade\x1b[0m', '\x1b[1mCódigo\x1b[0m']
    })
    const contactTable = new CliTable()
    const addrTable = new CliTable()

    infoTable.push(
        { '\x1b[1mNome\x1b[0m': data.nome },
        { '\x1b[1mNome Fantasia\x1b[0m': data.fantasia },
        { '\x1b[1mCNPJ\x1b[0m': data.cnpj },
        { '\x1b[1mTipo\x1b[0m': data.tipo },
        { '\x1b[1mAbertura\x1b[0m': data.abertura },
        { '\x1b[1mSituação\x1b[0m': data.situacao },
        { '\x1b[1mStatus\x1b[0m': data.status },
        { '\x1b[1mPorte\x1b[0m': data.porte },
        { '\x1b[1mNatureza Jurídica\x1b[0m': data.natureza_juridica },
        { '\x1b[1mUF\x1b[0m': data.uf },
        { '\x1b[1mCapital Social\x1b[0m': data.capital_social },
    )

    const mainActivity = data.atividade_principal.map(item => [item.text, item.code])
    const secondaryActivities = data.atividades_secundarias.map(item => [item.text, item.code])

    mainActivityTable.push(...mainActivity)
    secondaryActivitiesTable.push(...secondaryActivities)

    contactTable.push(
        { '\x1b[1mTelefone\x1b[0m': data.telefone },
        { '\x1b[1mEmail\x1b[0m': data.email }
    )

    addrTable.push(
        { '\x1b[1m\x1b[1mCidade\x1b[0m': `${data.municipio} - ${data.uf}` },
        { '\x1b[1mBairro\x1b[0m': data.bairro },
        { '\x1b[1mLogradouro\x1b[0m': data.logradouro },
        { '\x1b[1mNúmero\x1b[0m': data.numero },
        { '\x1b[1mCEP\x1b[0m': data.cep }
    )

    const nestedTables1Column1 = `\x1b[1m Informações\x1b[0m\n${infoTable.toString()}`
    const nestedTables1Column2 = `\x1b[1m Contato\x1b[0m\n${contactTable.toString()}\n\n Endereço\n${addrTable.toString()}`

    nestedTables.push([nestedTables1Column1, nestedTables1Column2])

    const mainActivityContainer = `\x1b[1m Atividade Principal\x1b[0m\n${mainActivityTable.toString()}`
    const secondaryActivitiesContainer = `\x1b[1m Atividade(s) Secundária(s)\x1b[0m\n${secondaryActivitiesTable.toString()}`

    return '\x1b[1m Empresa Info\x1b[0m\n'
        + `${nestedTables.toString()}\n\n${mainActivityContainer}\n\n${secondaryActivitiesContainer}`
}
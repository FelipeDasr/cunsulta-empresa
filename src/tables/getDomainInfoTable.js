const CliTable = require('cli-table')

const moment = require('moment')

module.exports = (data) => {

    const table = new CliTable()

    table.push(
        { '\x1b[1mDomínio\x1b[0m': data.domain },
        { '\x1b[1mProprietário\x1b[0m': data.owner },
        { '\x1b[1mE-mail\x1b[0m': data.eMail.split(' ')[0] },
        { '\x1b[1mCPF/CNPJ\x1b[0m': data.ownerid },
        { '\x1b[1mCriado\x1b[0m': moment(data.created.split(' ')[0], 'YYYYMMDD').format('YYYY/MM/DD') },
        { '\x1b[1mPaís\x1b[0m': data.country.split(' ')[0] },
    )

    return `\x1b[1m Domínio Info\x1b[0m\n${table.toString()}`
}
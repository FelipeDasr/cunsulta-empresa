module.exports = (_url) => {
    const https = 'https://'
    const http = 'http://'
    let url = _url.toLowerCase().replace(https, '').replace(http, '')
    return url.replace('www.', '').split('/')[0]
}
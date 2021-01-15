const assert = require('assert')
const api = require('../api')

const nanoid = require('nanoid')
const dns = require('dns')

let app = {}
let MOCK_ID = ``
let MOCK_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1NjcwMzYxOTJ9.Rucs0TRxlf4Hylol801jn0zTi-IPezfFg1YWf2OBuAM`

const headers = {
    Authorization: MOCK_TOKEN
}

function cadastrar() {
    return app.inject({
        method: 'POST',
        url: '/qrcodes',
        headers,
        payload: {
            originalUrl: 'https://gitlab.com',
            urlCode: 'jn1RbWk',
            shortUrl: 'https://mdbapi2.herokuapp.com/'
        }
    });
}

describe('****Api Qrcode Suite Tests****', function () {
    this.beforeAll(async () => {
        app = await api
        const result = await cadastrar()
        MOCK_ID = JSON.parse(result.payload)._id
    })

    it('T1 token Errado', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/qrcodes',
        })
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 401)
        assert.deepEqual(JSON.parse(result.payload).error, "Unauthorized")
    })

    it('T2 lista', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/qrcodes',
            headers
        })
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(JSON.parse(result.payload)))
    })

    it('T3 cadastra', async () => {
        const result = await cadastrar()
        //console.log(`result`, result)
        //console.log((bodyParser.payload), result)
        assert.deepEqual(result.statusCode, 200)
        assert.deepEqual(JSON.parse(result.payload).originalUrl, `https://gitlab.com`)

    })

    it('T4 payload Errado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/qrcodes',
            headers,
            payload: {
                ORIGINALUrl: 'Company1'
            }
        })
        const payload = JSON.parse(result.payload)
        assert.deepEqual(result.statusCode, 400)
        assert.ok(payload.message.search('"originalUrl" is required') !== -1)
    })

    it('T5 atualiza', async () => {
        const result = await app.inject({
            method: 'PATCH',
            url: `/qrcodes/${MOCK_ID}`,
            headers,
            payload: {
                originalUrl: 'https://git.com',
                urlCode: nanoid(7),
                shortUrl: 'https://mdbapi.herokuapp.com/documentation'
            }
        })
        assert.deepEqual(result.statusCode, 200)
        assert.deepEqual(JSON.parse(result.payload).nModified, 1)
    })

    it('T6 remove', async () => {
        const result = await app.inject({
            method: 'DELETE',
            url: `/qrcodes/${MOCK_ID}`,
            headers,
        })
        assert.deepEqual(result.statusCode, 200)
        assert.deepEqual(JSON.parse(result.payload).n, 1)
    })

    it('T7 verifica url', async () => {
        const result = await app.inject({
            method: 'POST',
            url: `/qrcodes`,
            headers,
            payload: {
                originalUrl: 'https://gatry',
                urlCode: 'BnrHuUk',
                shortUrl: 'https://mdbapi.herokuapp.com/'
            }
        })
        let verificaUrl = JSON.parse(result.payload).originalUrl
        //console.log(verificaUrl)
        try {
            verificaUrl = new URL(verificaUrl.url)
            //console.log(verificaUrl)
        } catch (err) {
            //console.log('erro 400')
        }
        dns.lookup(verificaUrl.hostname, (err) => {
            if (err) {
                //console.log('erro 404')
            }
        })
        assert.deepEqual(JSON.parse(result.payload).originalUrl, `https://gatry`)
    })
})
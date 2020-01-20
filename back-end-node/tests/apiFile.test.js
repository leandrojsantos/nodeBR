const assert = require('assert')
const api = require('../api')
const nanoid = require('nanoid')

let app = {}
let MOCK_ID = ``
let MOCK_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1NjcwMzYxOTJ9.Rucs0TRxlf4Hylol801jn0zTi-IPezfFg1YWf2OBuAM`

const headers = {
    Authorization: MOCK_TOKEN
}

function cadastrar() {
    return app.inject({
        method: 'POST',
        url: '/files',
        headers,
        payload: {
            name: 'test',
            size: '255',
            key: nanoid(7),
            url: 'https://gitlab.com'
        }
    });
}

describe('==> API File Suite Tests', function () {
    this.beforeAll(async () => {
        app = await api
        const result = await cadastrar()
        MOCK_ID = JSON.parse(result.payload)._id
    })

    it('t1tokenErrado', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/files',
        })
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 401)
        assert.deepEqual(JSON.parse(result.payload).error, "Unauthorized")
    })

    it('t2lista /files', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/files',
            headers
        })
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(JSON.parse(result.payload)))
    })

    it('t3cadastra /files', async () => {
        const result = await cadastrar()
        //console.log(`result`, result)
        //console.log((bodyParser.payload), result)
        assert.deepEqual(result.statusCode, 200)
        assert.deepEqual(JSON.parse(result.payload).name, `test`)

    })

    it('t4payloadErrado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/files',
            headers,
            payload: {
                NOME: 'test'
            }
        })
        const payload = JSON.parse(result.payload)
        assert.deepEqual(result.statusCode, 400)
        assert.ok(payload.message.search('"name" is required') !== -1)
    })

    it('t5atualiza /files/{id}', async () => {
        const result = await app.inject({
            method: 'PATCH',
            url: `/files/${MOCK_ID}`,
            headers,
            payload: {
                name: 'Bruce Lee',
                size: '25',
                key:  nanoid(7),
                url: 'https://gitlab.com'
            }
        })
        assert.deepEqual(result.statusCode, 200)
        assert.deepEqual(JSON.parse(result.payload).nModified, 1)

    })

    it('t6remove /files/{id}', async () => {
        const result = await app.inject({
            method: 'DELETE',
            url: `/files/${MOCK_ID}`,
            headers,
        })
        assert.deepEqual(result.statusCode, 200)
        assert.deepEqual(JSON.parse(result.payload).n, 1)
    })
})
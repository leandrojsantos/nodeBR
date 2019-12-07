const assert = require('assert')
const api = require('../api')

let app = {}
let MOCK_ID = ``
let MOCK_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RBdXRoIiwiaWF0IjoxNTY0Nzg2ODgzfQ.BP2442DMp74xYdtnaIznHa9gid6J2jh8TyAWMuoTP0s`

const headers = {
    Authorization: MOCK_TOKEN
}

function cadastrar() {
    return app.inject({
        method: 'POST',
        url: '/herois',
        headers,
        payload: {
            nome: 'Hulk',
            poder: 'forca'
        }
    });
}


describe('==> API Heroes Suite Tests', function () {
    this.beforeAll(async () => {
        app = await api
        const result = await cadastrar()
        MOCK_ID = JSON.parse(result.payload)._id
    })
    
    it('t1tokenErrado', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois',
        })
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 401)
        assert.deepEqual(JSON.parse(result.payload).error, "Unauthorized")
    })

    it('t2lista /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois',
            headers
        })
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(JSON.parse(result.payload)))
    })

    it('t3cadastra /herois', async () => {
        const result = await cadastrar()
        assert.deepEqual(result.statusCode, 200)
        assert.deepEqual(JSON.parse(result.payload).nome, `Hulk`)

    })

    it('t4payloadErrado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            headers,
            payload: {
                NAME: 'Hulk'
            }
        })
        const payload = JSON.parse(result.payload)
        assert.deepEqual(result.statusCode, 400)
        assert.ok(payload.message.search('"nome" is required') !== -1)
    })

    it('t4atualiza /herois/{id}', async () => {
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${MOCK_ID}`,
            headers,
            payload: {
                nome: 'Bruce Lee',
                poder: 'luta'
            }
        })
        assert.deepEqual(result.statusCode, 200)
        assert.deepEqual(JSON.parse(result.payload).nModified, 1)

    })

    it('t5remove /herois/{id}', async () => {
        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${MOCK_ID}`,
            headers,
        })
        assert.deepEqual(result.statusCode, 200)
        assert.deepEqual(JSON.parse(result.payload).n, 1)
    })
})
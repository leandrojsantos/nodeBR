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
        url: '/users',
        headers,
        payload: {
            username: nanoid(7),
            password: 'auth'
        }
    });
}

describe('==> API Users Suite Tests', function () {
    this.beforeAll(async () => {
        app = await api
        const result = await cadastrar()
        MOCK_ID = JSON.parse(result.payload)._id
    })

    it('t1tokenErrado', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/users',
        })
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 401)
        assert.deepEqual(JSON.parse(result.payload).error, "Unauthorized")
    })

    it('t2lista /users', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/users',
            headers
        })
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(JSON.parse(result.payload)))
    })

    it('t3cadastra /users', async () => {
        const result = await cadastrar()
        //console.log(`result`, result)
        //console.log((bodyParser.payload), result)
        const NAME_MOCK = JSON.parse(result.payload).username
        assert.deepEqual(result.statusCode, 200)
        assert.deepEqual(JSON.parse(result.payload).username, NAME_MOCK)
    })

    // it('t4usernameRepetido /users', async () => {
    //     const result = await cadastrar()
    //     //console.log(`result`, result)
    //     //console.log((bodyParser.payload), result)
    //     const NAME_MOCK = JSON.parse(result.payload).username
    //     assert.deepEqual(result.statusCode, 400)
    //     assert.deepEqual(JSON.parse(result.payload).username, NAME_MOCK)
    // })

    it('t5payloadErrado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/users',
            headers,
            payload: {
                NOME: 'mock'
            }
        })
        const payload = JSON.parse(result.payload)
        assert.deepEqual(result.statusCode, 400)
        assert.ok(payload.message.search('"username" is required') !== -1)
    })

    it('t6atualiza /users/{id}', async () => {
        const result = await app.inject({
            method: 'PATCH',
            url: `/users/${MOCK_ID}`,
            headers,
            payload: {
                username: 'Bruce Lee',
                password: 'auth'
            }
        })
        assert.deepEqual(result.statusCode, 200)
        assert.deepEqual(JSON.parse(result.payload).nModified, 1)

    })

    it('t7remove /users/{id}', async () => {
        const result = await app.inject({
            method: 'DELETE',
            url: `/users/${MOCK_ID}`,
            headers,
        })
        assert.deepEqual(result.statusCode, 200)
        assert.deepEqual(JSON.parse(result.payload).n, 1)
    })
})
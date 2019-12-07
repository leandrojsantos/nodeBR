const assert = require('assert')
const api = require('../api')
const Context = require('../src/db/strategies/base/contextStrategy')
const PostgresDB = require('../src/db/strategies/postgres/postgresSQLStrategy')
const UserSchema = require('../src/db/strategies/postgres/schemas/userSchema')

let app = {}

const USER = {
    username: 'test',
    password: 'auth'
}

const USER_DB = {
    ...USER,
    password: '$2b$04$meQYE5L8R6Wo5SfI8m6a7OFWmuJgPtFlvHveO5fN.bd8gM.DnzatS'
}


describe('==> Auth User Suite de Testes', function () {
    this.beforeAll(async () => {
        app = await api

        const connectionPostgres = await PostgresDB.connect()
        const model = await PostgresDB.defineModel(connectionPostgres, UserSchema)
        const postgresModel = new Context(new PostgresDB(connectionPostgres, model));
        await postgresModel.update(null, USER_DB, true)
    })

    it('t1obterToken', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        });
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        console.log(`dados`, dados);

        assert.deepEqual(statusCode, 200)
        assert.ok(JSON.parse(result.payload).token.length > 10)
    })

    it('t2loginErrado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'testeUsername',
                password: 'abc'
            }
        });
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 401)
        assert.deepEqual(JSON.parse(result.payload).error, "Unauthorized")
    })
})
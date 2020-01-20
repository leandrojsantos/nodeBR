const assert = require('assert')
const MongoDb = require('../src/db/strategies/mongodb/mongoDbStrategy')
const Context = require('../src/db/strategies/base/contextStrategy')
const FileSchema = require('../src/db/strategies/mongodb/schemas/fileSchema')
const nanoid = require('nanoid')

const MOCK_FILE_CADASTRAR = {
    name: nanoid(7),
    size: '123',
    key:  nanoid(7),
    url: 'https://gitlab.com/'
}


const MOCK_FILE_ATUALIZAR = {
    name: nanoid(7),
    size: '255',
    key:  nanoid(7),
    url: 'https://gitlab.com'
}

let MOCK_FILE_ATUALIZAR_ID = '';
let context = {}

describe('==> MongoDB Suite de Testes', function () {
    this.beforeAll(async () => {
        const connection = MongoDb.connect()
        context = new Context(new MongoDb(connection, FileSchema))

        const result = await context.create(MOCK_FILE_ATUALIZAR)
        MOCK_FILE_ATUALIZAR_ID = result._id
    })

    it('t1conexao', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado'

        assert.deepEqual(result, expected)
    })

    it('t2cadastro', async () => {
        const {
            name,
            size,
            key,
            url
        } = await context.create(MOCK_FILE_CADASTRAR)

        assert.deepEqual({
            name,
            size,
            key,
            url
        }, MOCK_FILE_CADASTRAR)
    })

    it('t3lista', async () => {
        const [{
            name,
            size,
            key,
            url
        }] = await context.read({
            name: MOCK_FILE_CADASTRAR.name
        })
        const result = {
            name,
            size,
            key,
            url
        }
        assert.deepEqual(result, MOCK_FILE_CADASTRAR)
    })

    it('t4atualiza', async () => {
        const result = await context.update(MOCK_FILE_ATUALIZAR_ID, {
            url: 'https://git.com/leandrojsantos'
        })
        assert.deepEqual(result.nModified, 1)
    })

    it('t5remove', async () => {
        const result = await context.delete(MOCK_FILE_ATUALIZAR_ID)
        assert.deepEqual(result.n, 1)
    })
})
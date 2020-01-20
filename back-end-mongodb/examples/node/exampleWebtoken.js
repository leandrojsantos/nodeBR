/**
 * web token = fluxo de dados cliente entra com login senha e recebe um token que tem aceeso a api porem esse token tem um determinado tempo com esse tempo experidado o cliente deve fazer login senha novamente 
 * 
 * token = vai em cada headers da requisicao e criptografado, sao como interceptadores para todas requicoes entao fluxo valida o token primeiro
 * 
 * site = jwt.io
 * 
 */

/**
 * primeiro criar os teste gera token 
 */
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

/**
 * apos os teste criar AuthRoutes 
 */
const BaseRoute = require('./base/baseRoute')

const Joi = require('joi')
const Boom = require('boom')

const PasswordHelper = require('./../helpers/passwordHelper')

const USER = {
    username: 'test',
    password: 'auth'
}

const Jwt = require('jsonwebtoken')

class AuthRoutes extends BaseRoute {
    //qual e password para descripitogra ou gera um novo token
    constructor(key) {
        super()
        this.secret = key
    }

    login() {

        return {
            path: '/login',
            method: 'POST',
            config: {

                //faz com que usuario gere um token
                auth: false,
                tags: ['api'],
                description: 'Obter tokin',
                notes: 'Retorna o token com user e senha do banco',

                validate: {
                    failAction: (request, h, err) => {
                        throw err;
                    },
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request, headers) => {
                const {
                    username,
                    password
                } = request.payload
                
                //valida os dados
                if (!USER) {
                    return Boom.unauthorized('Usuario nao existe')
                }

                const match = await PasswordHelper.comparePassword(password, USER.password)

                if (!match) {
                    return Boom.unauthorized('Usuario e Senha invalidos!')
                }

                return {
                    token: Jwt.sign({
                        username: username
                    }, this.secret)
                }
            }
        }
    }
}

module.exports = AuthRoutes


/**
 * entao va para api
 * 
 * npm install hapi-auth-jwt2
 * intercipata todos os servicos e verificar se token e valido
 */

const {
    join
} = require('path')
const {
    config
} = require('dotenv')

const {
    ok
} = require('assert')

const Hapi = require('hapi')
const env = process.env.NODE_ENV || "dev"
ok(env === "prod" || env === "dev", "environment inválida! Ou prod ou dev")

const configPath = join('./config', `.env.${env}`)

config({
    path: configPath
})

const HapiSwagger = require('hapi-swagger')
const Inert = require('inert')
const Vision = require('vision')
const HapiJwt = require('hapi-auth-jwt2')

// password para descripitogra ou gera um novo token
const JWT_KEY_ROOT = process.env.JWT_KEY

const swaggerConfig = {
    info: {
        title: 'Leandro - API Restfull',
        version: 'v5.0'
    },
}

const Context = require('./src/db/strategies/base/contextStrategy')
const MongoDB = require('./src/db/strategies/mongodb/mongoDbStrategy')
const PostgresDB = require('./src/db/strategies/postgres/postgresSQLStrategy')

const HeroSchema = require('./src/db/strategies/mongodb/schemas/heroSchema')
const UserSchema = require('./src/db/strategies/postgres/schemas/userSchema')

const UtilRoutes = require('./src/routes/utilRoutes')
const AuthRoutes = require('./src/routes/authRoutes')
const HeroRoutes = require('./src/routes/heroRoutes')

const app = new Hapi.Server({
    port: process.env.PORT,
    routes: {
        cors: true
    }
})


function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {

    const connectionPostgres = await PostgresDB.connect()
    const model = await PostgresDB.defineModel(connectionPostgres, UserSchema)
    const postgresModel = new Context(new PostgresDB(connectionPostgres, model));

    const connection = MongoDB.connect()
    const mongoDb = new Context(new MongoDB(connection, HeroSchema))

    //iniciar com app.register
    await app.register([
        HapiJwt,
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerConfig
        }
    ])

    /**
     * para seta a strategy para autenticacao para td no schema 'jwt' 
     */
    app.auth.strategy('jwt', 'jwt', {
        //usada para descriptografia 
        key: JWT_KEY_ROOT,
        // options: {
        //     expiresIn: 30
        // },

        /**
         * funcao para valida se conteudo descriptogrado consta no banco por exemplo verifica se usuario continua ativo ou pagando
         */
        validate: (dado, request) => {
            return {
                isValid: true
            }
        }
    })

    //faz toda autenticacao da api por default tenha que ser auth no schma 'jwt'
    app.auth.default('jwt')

    /**
     * feito isso ir heroRoutes e adicionar em cada rota a autorizacao necessaria por exemplo:
     * 
     * 
                validate: {
                    headers: Joi.object({
                        authorization: Joi.string().required()
                    }).unknown()
                }
                
     */

    app.route([
        ...mapRoutes(new UtilRoutes(), UtilRoutes.methods()),
        ...mapRoutes(new HeroRoutes(mongoDb), HeroRoutes.methods()),

        //mapear a rota de login: para receber intancia do jwt
        ...mapRoutes(new AuthRoutes(JWT_KEY_ROOT, postgresModel), AuthRoutes.methods())
    ])

    await app.start()
    console.log('SERVIDOR OK na porta', app.info.port)

    return app;
}

module.exports = main()
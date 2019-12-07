const BaseRoute = require('./base/baseRoute')

const Joi = require('joi')
const Boom = require('boom')

const PasswordHelper = require('../helpers/passwordHelper')

const USER = {
    username: 'test',
    password: 'auth'
}
const Jwt = require('jsonwebtoken')

class AuthRoutes extends BaseRoute {
    constructor(key, db) {
        super()
        this.secret = key
        this.db = db
    }

    login() {

        return {
            path: '/login',
            method: 'POST',
            config: {
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

                const [USER] = await this.db.read({
                    username: username.toLowerCase()
                })

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
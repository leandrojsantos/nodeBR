const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

const dns = require('dns')
const nanoid = require('nanoid')

class QrcodeRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/qrcodes',
            method: 'GET',
            config: {
                tags: ['api'],
                description: 'Listas todos os qrcodes ',
                notes: 'Retorna a base inteira de qrcode',

                validate: {
                    failAction: (request, h, err) => {
                        throw err;
                    },
                    headers: Joi.object({
                        authorization: Joi.string().required()
                    }).unknown(),
                }
            },
            handler: (request, headers) => {
                return this.db.read()
            }
        }
    }

    create() {
        return {
            path: '/qrcodes',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'Cadastra novo qrcode ',
                notes: 'add novo qrcode',
                plugins: {
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
                validate: {
                    failAction: (request, h, err) => {
                        throw err;
                    },
                    headers: Joi.object({
                        authorization: Joi.string().required()
                    }).unknown(),
                    payload: {
                        originalUrl: Joi.string().min(3).max(200).required(),
                        urlCode: Joi.string().min(3).max(7),
                        shortUrl: Joi.string().min(3).max(50)
                    }
                },

            },
            handler: (request, headers) => {
                const payload = request.payload
                return this.db.create(payload)
            }
        }
    }

    update() {
        return {
            path: '/qrcodes/{id}',
            method: 'PATCH',
            config: {
                tags: ['api'],
                description: 'Atualizar qrcode',
                notes: 'Atualiza um qrcode dinamico por ID',
                plugins: {
                    'hapi-swagger': {
                        payloadType: 'form'
                    }
                },
                validate: {
                    failAction: (request, h, err) => {
                        throw err;
                    },
                    headers: Joi.object({
                        authorization: Joi.string().required()
                    }).unknown(),
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        originalUrl: Joi.string().min(3).max(200).required(),
                        urlCode: Joi.string().min(3).max(7),
                        shortUrl: Joi.string().min(3).max(50)
                    }
                },

            },
            handler: (request, headers) => {
                const payload = request.payload;
                const id = request.params.id;
                return this.db.update(id, payload)
            }
        }
    }

    delete() {
        return {
            path: '/qrcodes/{id}',
            method: 'DELETE',
            config: {
                tags: ['api'],
                description: 'Remove qrcode',
                notes: 'Remove um qrcode por ID',

                validate: {
                    failAction: (request, h, err) => {
                        throw err;
                    },
                    headers: Joi.object({
                        authorization: Joi.string().required()
                    }).unknown(),
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: (request, headers) => {
                const id = request.params.id;
                return this.db.delete(id)
            }
        }
    }

}

module.exports = QrcodeRoutes

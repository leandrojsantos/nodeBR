/*** 
 * Joi = para manunupilar requecicoes pelo heads ou seja valudacao fluende 
 * 
 * npm install joi
 *  
 */

const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',

            config: {
                tags: ['api'],
                description: 'Listar Heroi',
                notes: 'Retorna a base inteira de herois',

                /**
                 * onde e configurado o objeto no caso
                 */
                validate: {
                    /**
                     * sem a validacao necessaria nem vai para headers as validacoes pode ser :
                     * 
                     * payload valida o corpo da requicicao,
                     * heardera valida o header ou cabecario da requicisao,
                     * query valida a URL passa,
                     * params valida o parametro passado na url ou por exemplo /:id,
                     * 
                     * required() = campo obrigatorio,
                     * unknown() = objeto indefinido
                     * failAction = tipo do erro 
                     * 
                     */
                    headers: Joi.object({
                        authorization: Joi.string().required()
                    }).unknown()
                }
            },
            handler: (request, headers) => {
                return this.db.read()
            }
        }
    }


}

module.exports = HeroRoutes
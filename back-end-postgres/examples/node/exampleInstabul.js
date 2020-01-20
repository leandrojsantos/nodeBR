/**
 * cobertura de codigo
 * com instabul
 * 
 * site https://istanbul.js.org/
 * 
 * instalacao
 * npm install --save-dev nyc
 * 
 */

/**
 * feito no packeage.json colocar nyc antes do mocha fazendo script fica assim "test": "nyc --reporter=html mocha --timeout 50000 tests/*.test.js --exit"
 * apos isso rodar npm test ele ira gerar 2 pastas a primeira chamada .nyc_output onde e gerado os json da cobertura do codigo, a segunda coverage onde gera os mesmo codigos so que em html 
 * 
 */

/**
 * expor numa rota
 * criar em routes utilRoutes.js
 */
const BaseRoute = require('./base/baseRoute')
const {
    join
} = require('path')

class UtilRoutes extends BaseRoute {
    coverage() {
        return {
            path: '/coverage/{param*}',
            method: 'GET',
            config: {
                auth: false,
            },
            handler: {
                directory: {
                    path: join(__dirname, '../../coverage'),
                    redirectToSlash: true,
                    index: true,
                },
            },
        }
    }
}

module.exports = UtilRoutes

/**
 * apos isso add rota na api.js
 */
const UtilRoutes = require('./src/routes/utilRoutes')

app.route([
    ...mapRoutes(new UtilRoutes(), UtilRoutes.methods()),])

/**
 * obs e importante que seja exporto em um dominio expefico ou tenha uma rota de autenticacao segura 
 */
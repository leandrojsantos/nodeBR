/**
 * Para garantir a consistencia do dados pois no mongodb e flexil demais isso tem lado bom e um ruim por ex update incorreto ele sobre poe dados para que isso e outros ex nao acontencam vamos usar o mongoose (ODM obbect document Mapper)que sua principal funcao e garantia desse dados 
 */

/**
 * para instalar.:
 * npm install mongoose
 */

/**
 * conexao 
 * connect = banco://usuario:senha@ondeestarodando:porta/database
 * usenewurlparse = evita noticao de depecricated
 * state = traz info do estado do banco  0 e desconectado, 1 e conectado, 2 e conectando, 3 e desconectado
 */

/**conexao normal*/
Mongoose.connect('mongodb://root:root@localhost:27017/herois', {
    useNewUrlParser: true
}, function (error) {
    if (!error) return;
    console.log('*****erro conexão MONGODB!', error)
})

/**conexao com .env */
// Mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true
// }, function (error) {
//     if (!error) return;
//     console.log('*****erro conexão MONGODB!', error)
// })
// const connection = Mongoose.connection
// connection.once('open', () => console.log('MONGODB OK'))
// return connection;


setTimeout(() => {
    const state = connected.readyState
    console.log('state', state)
}, 2000)

/**
 * schema = model obj
 */
const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    inserteAt: {
        type: Date,
        default: new Date()
    }
})
const model = Mongoose.model('herois', heroiSchema)

/**
 * com o model feito ja se consegue faz a acoes de crud
 * obs.: array function so pode ser usada dentro de um contexto ou execucao ou this por exemplo em test sempre bom usar function
 */

async function main() {
    /**
     * create
     */
    const resultCadrastar = await model.create({
        nome: 'Rock Balboa',
        poder: 'luta'
    })
    console.log('Cadrastro.:', resultCadrastar)

    /**
     * listar
     * skip e limit = paginacao
     */
    const listItens = await model.find()
    console.log('Listar.:', listItens)

}
main()
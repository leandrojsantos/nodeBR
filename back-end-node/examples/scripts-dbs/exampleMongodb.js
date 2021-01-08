/**
* Para garantir a consistência de dados pois no mongodb e flexível demais isso tem lado bom e um ruim por ex update incorreto ele sobrepõe dados para que isso e outros ex não aconteçam vamos usar o mongoose (ODM object document Mapper)que sua principal função é garantia desse dados
*/
 
/**
* para instalar.:
* npm install mongoose
*/
 
/**
* conexão
* connect = banco://usuario:senha@ondeestarodando:porta/database
* usenewurlparse = evita notificação de deprecated
* state = traz info do estado do banco  0 e desconectado, 1 e conectado, 2 e conectando, 3 e desconectado
*/
 
/**conexão normal*/
Mongoose.connect('mongodb://root:root@localhost:27017/herois', {
   useNewUrlParser: true
}, function (error) {
   if (!error) return;
   console.log('*****erro conexão MONGODB!', error)
})
 
/**conexão com .env */
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
* com o model feito já se consegue faz a ações de crud
* obs.: array function só pode ser usada dentro de um contexto ou execução ou this por exemplo em teste sempre bom usar function
*/
 
async function main() {
   /**
    * create
    */
   const resultCadrastar = await model.create({
       nome: 'Rocky Balboa',
       poder: 'luta'
   })
   console.log('Cadrastro.:', resultCadrastar)
 
   /**
    * listar
    * skip and limit = paginação
    */
   const listItens = await model.find()
   console.log('Listar.:', listItens)
 
}
main()
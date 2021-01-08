### COMANDOS BASICOS DO MONGODB

conectar no mongo 

    docker exec - it id_da_imagem_mongo - u usuario - p senha

monstrar os databases

    show dbs

mudado para database desejado

    use nome_do_databases
    use herois

mostrar tables = collecoes 

    show collections

create

    db.herois.insert({
        nome: 'Hulk',
        poder: 'raiva',
        dataNascimento: '25-03-1967'
    })

read

    db.herois.find()
    db.herois.find().pretty() //formata os resultados

update

    db.herois.find({
        nome: 'hulk'
    }) 

    //para encontra o obj na collecton,com obj id altere obj

    db.herois.update({
        _id: ObjectId("5d12256ceed686b4c8742df3")
    }, {
        nome: 'Chaploin',
        poder: 'mareta-bionica'
    }) 

    //Dessa maneira acima e perigo perde dados o jeito certo e usar $set: {}

    db.herois.update({
    _id: ObjectId("5d12256ceed686b4c8742df3")
    }, {
        $set: {
            nome: 'Chapolin',
            poder: 'marreta-bioca'
        }
    })


delete

    db.herois.remove({}) //todos
    db.herois.remove({
        _id: ObjectId("5d1259895f3bdc2485101da6")
    })

prova de que e possivel rodar javascript dento do banco 

    for (let i = 0; i <= 100; i++) {
        db.herois.insert({
            nome: 'Clone-${i}',
            poder: 'raiva',
            dataNascimento: '25-03-1967'
        })
    }

conta numero de itens na collection

    db.herois.count()

traz somente um resuldo da collection

    db.herois.findOne()

traz com limite e sort ordena 

    db.herois.find().limit(5).sort({
        nome: -1
    }) 

fazer o find como um filtro, ou coluna 

    db.herois.find({}, {
        poder: 1,
        _id: 0
    })
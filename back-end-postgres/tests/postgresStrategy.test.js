const {
  equal,
  deepEqual,
  ok
} = require('assert');

const PostgresStrategy = require('../src/db/strategies/postgres/postgresSQLStrategy');
const UserSchema = require('../src/db/strategies/postgres/schemas/userSchema')
const Context = require('../src/db/strategies/base/contextStrategy')
const nanoid = require('nanoid')

const MOCK_USER_CADASTRAR = {
  username:  nanoid(7),
  password: '8m6a7OFeQYE5LWmuJgPtFlvHveO5fN.kfsfhAAsbd8gM.DSAghrWw'
}
const MOCK_USER_ATUALIZAR = {
  username: nanoid(7),
  password: nanoid(7)
}

let context = {}

describe('==> PostgreSQL Suite de Testes', function () {
  this.timeout(Infinity);
  before(async () => {
    const connection = await PostgresStrategy.connect()
    const model = await PostgresStrategy.defineModel(connection, UserSchema)
    context = new Context(new PostgresStrategy(connection, model));

    await context.delete();
    await context.create(MOCK_USER_CADASTRAR);
    await context.create(MOCK_USER_ATUALIZAR);
  });

  it('t1conexao', async () => {
    const result = await context.isConnected();
    equal(result, true);
  });
  
  //verificar 
  // it('t2cadastra', async () => {
  //   const result = await context.create(MOCK_USER_CADASTRAR);
  //   delete result.dataValues.id;
  //   deepEqual(result.dataValues, MOCK_USER_CADASTRAR);
  // });

  it('t3listar', async () => {
    const [result] = await context.read(MOCK_USER_CADASTRAR);
    delete result.id;
    deepEqual(result, MOCK_USER_CADASTRAR);
  });

  it('t4atualiza', async () => {
    const [result] = await context.read({});

    const novoItem = {
      ...MOCK_USER_CADASTRAR,
      username: 'Bruce lee',
    };
    const [update] = await context.update(result.id, novoItem);

    deepEqual(update, 1);
  });

  it('t5remove', async () => {
    const [item] = await context.read({});
    const result = await context.delete(item.id);
    deepEqual(result, 1);
  });
});
<h1 align="center">
     <a href="#" alt="">BackEnd nodejs com hapijs/swagger, base de dados no MongoDB</a>
</h1>

<h4 align="center">
	🚧   Concluído 🚀 🚧
</h4>

Tabela de conteúdos
<!--ts-->
   * [Sobre o projeto](#-sobre-o-projeto)
   * [Funcionalidades](#-funcionalidades)
   * [Como executar o projeto](#-como-executar-o-projeto)
     * [Pré-requisitos](#pré-requisitos)
     * [Rodando o Projeto](#user-content--rodando-o-projeto)
   * [Tecnologias](#-tecnologias)

<!--te-->


## 💻 Sobre o projeto

Back-end feito em node.js base para incio de projetos com base unica mongodb.

A pasta examples foi criada como exemplos de
código e comentários sobre como e funciona cada biblioteca e padrão de projeto, também a comentários no código para explicação.

Observação por causa descontinuamento do framework [hapijs](https://hapi.dev/) e essencial para que o back-end funcione, corretamente que este projeto seja instalado na versão do [Node na versão 10.19.0](https://nodejs.org/en/)
devido a esse incômodo sugiro que tenha o [nvm](https://itnext.io/nvm-the-easiest-way-to-switch-node-js-environments-on-your-machine-in-a-flash-17babb7d5f1b) que serve para gerenciar versões

---

## ⚙️ Funcionalidades

- [x] api com mongodb e mongoclient
- [x] api com crud no banco de dados
- [x] testes unitários com mocha 
- [x] modo development e production

---
## 🚀 Como executar o projeto

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Docker](https://docs.docker.com/engine/install/ubuntu/), [Node na versão 10.19.0](https://nodejs.org/en/), para controle de versão do node [nvm](https://itnext.io/nvm-the-easiest-way-to-switch-node-js-environments-on-your-machine-in-a-flash-17babb7d5f1b)

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/) e também um navegador/Browser de sua escolha.

#### 🎲 Rodando o Projeto

```bash
# Acesse a pasta do projeto no vscode, vá para a pasta docker do projeto

# Acesse o arquivo comando-dbs.md e faça os passos para do mongodb terminal  
# Seguida já com imagens docker do mongodb/mongoclient
# Abra seu navegador em http://localhost:3000/ faça login como está no arquivo comando-dbs

# Instale as dependências
$ npm install

# Tira erros de dependências
$ npm audit fix --force

# para testes na api
$ npm test

# Executa a aplicação em modo de desenvolvimento
$ npm run dev

# Executa a aplicação em modo de produção
$ npm run prod

# O servidor iniciará na porta:5000 - acesse http://localhost:5000/documentation

# Obs: no arquivo package.json deve se manter as bibliotecas nas versões seguintes :
  "devDependencies": {
    "mocha": "^7.1.1",
    "nyc": "^15.0.0",
    "saslprep": "^1.0.3",
    "boom": "^7.3.0",
    "nodemon": "^2.0.2"
  },
  "dependencies": {
    "bcrypt": "^5.0.0",
    "body-parser": "^1.19.0",
    "config": "3.2.3",
    "cors": "^2.8.5",
    "cross-env": "5.2.0",
    "dotenv": "8.0.0",
    "hapi": "^18.1.0",
    "hapi-auth-jwt2": "8.6.1",
    "hapi-swagger": "10.0.2",
    "inert": "^5.1.3",
    "joi": "^14.3.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.9.5",
    "nanoid": "^2.1.11",
    "pg": "^7.18.2",
    "pg-hstore": "^2.3.3",
    "sequelize": "^5.21.5",
    "vision": "^5.4.4"
```
---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

    1. Resolução de promises com Async/Await
    2. Ambiente e configuração do ciclo de testes com Mocha
    3. 
    4. Design Patterns - Strategy
    5. 
    6. Mongoose como odm para mongodb
    7. Hapi.js 
    8. APIs com Hapi.js
    9. Swagger para teste com hapi
    10. Json Web Token
    11. Configuracao JWT - plugins, testes e rota de login
    12. Hapi-JWT ao nosso Serviço 
    13. Autenticação de usuarios e hash de senha com bcrypt
    14. Trabalhando com modeo development e production
    15. 
    16. MongoDB modo production com cloud Mongo atlas
    17. 
    18. PM2 para gerência do node 
    19. Expondo cobertura de código com Istanbul
    20. Docker para criar a base de teste (ver example docker)
    21. 
    22. MongoClient para interface mongodb (ver example docker) http://localhost:3000/
    23. Nanoid para criação de id únicos
---
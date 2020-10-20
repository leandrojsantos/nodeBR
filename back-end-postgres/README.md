<h1 align="center">
     <a href="#" alt="">BackEnd com base no PostgresSQL</a>
</h1>

<h4 align="center">
	🚧   Concluído 🚀 🚧
</h4>

Tabela de conteúdos
<!--ts-->
   * [Sobre o projeto](#-sobre-o-projeto)
   * [Funcionalidades](#-funcionalidades)
   * [Layout](#-layout)
   * [Como executar o projeto](#-como-executar-o-projeto)
     * [Pré-requisitos](#pré-requisitos)
     * [Rodando o Projeto](#user-content--rodando-o-projeto)
   * [Tecnologias](#-tecnologias)

<!--te-->


## 💻 Sobre o projeto

Back-end feito em node.js base para incio de projetos com base unica postgres.

A pasta examples foi criada como exemplos de
código e comentários sobre como e funciona cada biblioteca e padrão de projeto, também a comentários no código para explicação.

---

## ⚙️ Funcionalidades

- [x] api com postregres e adminer
- [x] api com crud no banco de dados
- [x] testes unitários com mocha 
- [x] modo development e production

---

## 🎨 Layout

O layout da aplicação:

<p align="center">
  <img alt="postgres-mdb" title="#postrgres-mdb" src="./assets/home-mobile.png" width="400px">

  <img alt="postrgres-mdb" title="#postrgres-mdb" src="./assets/detalhes-mobile.svg" width="400px">
</p>

<p align="center">
  <img alt="postrgres-mdb" title="#postrgres-mdb" src="./assets/home-mobile.png" width="400px">

  <img alt="postgres-mdb" title="#postgres-mdb" src="./assets/detalhes-mobile.svg" width="400px">
</p>


---

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Docker](https://docs.docker.com/engine/install/ubuntu/), [Node na versão 10.19.0](https://nodejs.org/en/)

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/) e também um navegador/Browser de sua escolha.

#### 🎲 Rodando o Projeto

```bash
# Clone este repositório
$ git clone git@github.com:leandrojsantos/node-br.git

# Acesse a pasta do projeto no terminal/cmd, vá para a pasta raiz do projeto
$ cd node-br/back-end-node

# Instale as dependências
$ npm install

# para testes na api
$ npm test

# Executa a aplicação em modo de desenvolvimento
$ npm run dev

# Executa a aplicação em modo de produção
$ npm run prod

# O servidor inciará na porta:5000 - acesse http://localhost:5000

obs: package.json manter nas ver citadas as seguites bibliotecas:

    "cross-env": "5.2.0",
    "dotenv": "8.0.0",
    "config": "3.2.3",
    "bcrypt": "3.0.6",
    "hapi-auth-jwt2": "8.6.1",
    "hapi-swagger": "10.0.2",

```
---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

    1. Resolução de promises com Async/Await
    2. Ambiente e configuração do ciclo de testes com Mocha
    3. 
    4. Design Patterns - Strategy
    5. Sequelize como orm para postgres
    6. 
    7. Hapi.js 
    8. APIs com Hapi.js
    9. Swagger para teste com hapi
    10. Json Web Token
    11. Configuracao JWT - plugins, testes e rota de login
    12. Hapi-JWT ao nosso Serviço 
    13. Autenticação de usuarios e hash de senha com bcrypt
    14. Trabalhando com modo development e production usando .env
    15. Publicação e depoly com Heroku & Heroku toolbelt cli
    16. 
    17. Postgres modo production no Heroku
    18. PM2 para gerência do node 
    19. Expondo cobertura de código com Istanbul
    20. Docker para criar a base de teste (ver example docker)
    21. Adminer para interface development postgres (ver example docker) http://localhost:8080/
    22. 
    23. nanoid para criar um id unico para url-encutadas

---
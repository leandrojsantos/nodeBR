# BackEnd com base no PostgresSQL
--------------------------------------------------
>Back-end feito em node.js base para incio de projetos com base unica postgres, com as seguintes bibliotecas e padrao favor continuar seguindo. 

Para inciar o projeto deve ter: 

    node, docker instalados apos,
    npm install (para instalar a node_modules que contem as biblioteca)
    npm test (para testes na api)
    npm run dev (para iniciar em dev)
    npm run prod (para inciar em producao)
   
>Segue descricao do projeto:
   
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

>obs 1: a pasta examples foi criada como exemplos de
codigo e comentarios sobre como e funciona cada biblioteca e padrao de projeto

>obs 2: package.json manter nas versoes citadas as seguites bibliotecas:

    "cross-env": "5.2.0",
    "dotenv": "8.0.0",
    "config": "3.2.3",
    "bcrypt": "3.0.6",
    "hapi-auth-jwt2": "8.6.1",
    "hapi-swagger": "10.0.2",
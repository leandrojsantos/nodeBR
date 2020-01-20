# Heroku 
------------------------- 
https://www.heroku.com/

>Heroku vai ser usado no projeto para banco de dados online para postgres e tambem como forma de deploy
    
    npm install -g heroku

>Instalacao global pois podemos usar atraves do terminal com heroku cli, apos isso conceito basico localhost nao existe ou so deve ser usado quando mudar a variavel de ambiente, para isso ir no package.json e cria um novo script

    "prod": "cross-env NODE_ENV=prod pm2-runtime api.js"

>Feito isso criar a arquivo na raiz do projeto chamado 'Procfile' que serve para o heroku indetificar os comandos do package.json

    web: npm run prod

______________

Comandos basicos do heroku cli ou via terminal

>entra na conta

    heroku login

>lista seus apps

    heroku apps:list 

>cria um novo app esse nome deve ser unico e sera o mesmo da url

    heroku apps:create NOME_DO_APP

>mostra logs 

    heroku logs 
___________________
Apos criado app sao mesmos comando do git
>para inicializar

    git init 

>linkar origin pasta (fetch) e origin pasta (push)

    heroku git:remote --app NOME_DO_APP 

>linkar no git do heroku para origin pasta (fetch) e origin pasta (push)

    git remote -v 

>comandos para subir app no heroku

    git status
    git add .
    git commit -m "v01"
    git push heroku master

ou

    git add . && git commit -m "v01" && git push heroku master 
_____________

Feito isso tem liberar app no site do heroku
para isso fazer login no meu esquerdo superior clica e selecionar 'DATA' nele escolher a opcao do postgres enao selecionar no canto superior esquerdo 

    "install heroku postgres" 

Apos colocar nome app seleciona "provision add-on"

Em seguida va ao canto direto inferior cliclar em heroku postgres que abrira o dashboad com infos do app onde tera na navbar a opcao settings, 

    "viem credentials" 

Entra nessa opcao para pega uri de conexao em com postgres 
com uri copiada substua POSTGRES_URL= por essa em config .env.prod 

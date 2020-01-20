/****pm2
http://pm2.keymetrics.io/
 * 
npm install -g pm2
necessario tambem instalacao global
**/

/** 
 * comando node api.js (por ex) onde e dado start do app se algo inesperado ocorrer tudo para pois node e assincrono mas esta tudo na mesmo processo
 * monitara a aplicacao e faz gestao do app com um conjunto completo de recursos para o ambiente de produção
 * /

/**
 * 
 * onde esta no pakage.json script para inicia o projeto em producao no nosso caso sript
 *  prod: pm2 runtime api.js
 */

/**
 * *comandos basicos para pm2
 * pm2 start --name herois -i 10 api.js = cria 10 instacias do que ta rodando 
 * pm2 monit = monitora todas as aplicoes
 * pm2 logs = ver logs
 * pm2 kill = mata todas aplicoes 
 * heroku config:set PM2_PUBLIC_KEY=70gkh0t5ork2cy7 PM2_SECRET_KEY=ge7h765ewpt1zsn = linka com heroku
 * 
 */
# event node

Sempre que você chama uma função síncrona (i.e. “normal”) ela vai para uma “call stack” ou pilha de chamadas de funções com o seu endereço em memória, parâmetros e variáveis locais. Se a partir dessa função você chamar outra, esta nova função é empilhada em cima da anterior (não literalmente, mas a ideia é essa). Quando essa nova função termina, ela é removida da call stack e voltamos o fluxo da função anterior. Caso a nova função tenha retornado um valor, o mesmo é adicionado à função anterior na call stack.

Mas o que acontece quando chamamos algo como setTimeout, http.get, process.nextTick, ou fs.readFile? Estes não são recursos nativos do V8, mas estão disponíveis no Chrome WebApi e na C++ API no caso do Node.js.

Vamos dar uma olhada em uma aplicação Node.js comum – um servidor escutando em localhost:3000. Após receber a requisição, o servidor vai chamar wttr.in/ para obter informações do tempo e imprimir algumas mensagens no console e depois retorna a resposta HTTP.

>No index.js fiz mas alguns comentarios

>Para iniciar projeto

    node index.js
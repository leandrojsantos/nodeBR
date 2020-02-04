# Comandos Docker :
-------------------------

# IMAGEM

>nao usar sudo

    sudo usermod -aG docker $(whoami)

>procura uma imagem

    docker search nome_da_img

>baixa imagem na ultima versao

    docker pull nome_da_img

>excuta a imagem

    docker run nome_da_img

>baixa imagem de versao expefica

    docker pull nome_da_img:nome_ou_numero_da_ver

>linkar imagens, por ex postgres necessita do pgadmin

    docker run --link postgres:pgadmin

>lista imagens

    docker images

>lista imagens rodando

    docker ps -a

>para todas imagens

    $(docker ps -qa)

>para excluir a imagem

    docker rmi id_da_img

>entra na imagem

    docker exec -it nome_da_imagem 

>sai dessa imagem

    exit
__________________

# CONTAINER

>cria container

    docker run nome_da_imagem

>cria container nome e porta, para ex redis

    docker run -d -p 6379:6379 --name redisnovo redis

>cria um nome para container

    docker run --name nome_escolhido nome_da_imagem

>Informações de uso de Hardware do container

    docker stats id_ou_nome
    docker inspect id_ou_apelido

>Mapeando uma porta para o container, sempre usar portas padroes dos programas mas vc pode alterar. Estamos informando que a porta 8080 no Host é aberta e deve ser mapeada na porta 80 do container

    docker run -it -p 8080:80 nome_da_imagem

>inicia o container

    docker start id_ou_nome

>para o container

    docker stop id_ou_nome

>entra no container

    docker exec -it nome_do_container 

>entra no container e executa comando

    docker exec -it id_ou_nome comando_para_executar

>sai do container

    exit

>para excluir o container

    docker rm id_ou_nome

>apaga todos os containers

    docker rm $(docker ps -qa)

_______________________

# OUTROS COMANDOS

    docker --help


>Segue a lista de comando docker e sua utilidade

docker attach – Acessar dentro do container e trabalhar a partir dele.

docker build – A partir de instruções de um arquivo Dockerfile eu possa criar uma imagem.

docker commit – Cria uma imagem a partir de um container.

docker cp – Copia arquivos ou diretórios do container para o host.

docker create – Cria um novo container.

docker diff – Exibe as alterações feitas no filesystem do container.

docker events – Exibe os eventos do container em tempo real.

docker exec – Executa uma instrução dentro do container que está rodando sem precisar atachar nele.

docker export – Exporta um container para um arquivo .tar.

docker history – Exibe o histórico de comandos que foram executados dentro do container.

docker images – Lista as imagens disponíveis no host.

docker import – Importa uma imagem .tar para o host.

docker info – Exibe as informações sobre o host.

docker inspect – Exibe r o json com todas as configurações do container.

docker kill – Da Poweroff no container.

docker load – Carrega a imagem de um arquivo .tar.

docker login – Registra ou faz o login em um servidor de registry.

docker logout – Faz o logout de um servidor de registry.

docker logs – Exibe os logs de um container.

docker port – Abre uma porta do host e do container.

docker network – Gerenciamento das redes do Docker.

docker node – Gerenciamento dos nodes do Docker Swarm.

docker pause – Pausa o container.

docker port – Lista as portas mapeadas de um container.

docker ps – Lista todos os containers.

docker pull – Faz o pull de uma imagem a partir de um servidor de registry.

docker push – Faz o push de uma imagem a partir de um servidor de registry.

docker rename – Renomeia um container existente.

docker restart – Restarta um container que está rodando ou parado.

docker rm – Remove um ou mais containeres.

docker rmi – Remove uma ou mais imagens.

docker run – Executa um comando em um novo container.

docker save – Salva a imagem em um arquivo .tar.

docker search – Procura por uma imagem no Docker Hub.

docker service – Gernciamento dos serviços do Docker.

docker start – Inicia um container que esteja parado.

docker stats – Exibe informações de uso de CPU, memória e rede.

docker stop – Para um container que esteja rodando.

docker swarm – Clusterização das aplicações em uma orquestração de várias containers, aplicações junto.

docker tag – Coloca tag em uma imagem para o repositorio.

docker top – Exibe os processos rodando em um container.

docker unpause – Inicia um container que está em pause.

docker update – Atualiza a configuração de um ou mais containers.

docker version – Exibe as versões de API, Client e Server do host.

docker volume – Gerenciamento dos volumes no Docker.

docker wait – Aguarda o retorno da execução de um container para iniciar esse container.
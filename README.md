# Dulce-API

Dulce-API provê API's para o desenvolvimento de Apps utilizando microsserviços.
Cada API descreve apenas uma funcionalidade de um sistema, isso torna a aplicação modular e favorece o baixo acoplamento.

Microsserviços é uma estratégia de arquitetura de software que vem sendo aplicada há alguns anos com o objetivo de proporcionar uma melhor escalabilidade aos serviços. Ao projetar esse novo modelo arquitetural, os princípios de orientação a objetos, desacoplamento e responsabilidades tornam-se fundamentais.

O conceito principal dentro do microsserviços é estabelecer pequenos serviços que possam funcionar de forma independente, permitindo assim a sua escala por serviço e, permitindo inclusive garantir o funcionamento da operação mesmo em caso de falha de um determinado serviço.

## Instalação e uso

#### Instalação do Docker

***DOCKER - na pasta do projeto***

    sudo apt-get update

    sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

    sudo apt-key fingerprint 0EBFCD88

    sudo add-apt-repository \
    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) \
    stable"

    sudo apt-get update

    sudo apt-get install docker-ce


Para utilizar as API disponíveis e customizá-las para se adequar ao seu sistema, basta seguir os seguintes passos :

Clone o repositório utilizando o comando (o símbolo "$" não deve ser copiado. Apenas indica que tal comando
deve ser digitado em seu terminal) :

    $ git clone origin https://github.com/fga-gpp-mds/2018.1-Dulce_API

Entre no diretório em que há o arquivo Dockerfile. Se você estiver utilizando o terminal linux, basta digitar :

    $ cd 2018.1-Dulce_API/DataBase

Observe que há um arquivo Dockerfile neste diretório. Agora basta digitar os seguintes comandos :

    $ sudo docker-compose up --build

Após executar o docker, abra uma nova aba no terminal e digite os seguintes comandos:

     $ cd RabbitMQ
     $ sudo docker-compose up --build

Em seguida, partindo da raiz do diretório para cadastrar usuários e outras funcionalidades relacionadas

    $ cd User

Para executar o arquivo Dockerfile de User abra uma nova aba no terminal e digite:

    $ sudo docker-compose up --build

Já para o login, após o funcionamento do Dockerfile de DataBase:

    $ cd Login

E execute o Dockerfile contido nele abra uma nova aba no terminal e digite:

    $ sudo docker-compose up --build

Nesse caso, esse Dockerfile será utilizado para fazer apenas login de usuários.

Acesse no seu navegador a porta 8080
do servidor local por meio do link [localhost:8080](http://localhost:8080) para o DataBase, já para o Login ou User deve-se utilizar [localhost:8081](http://localhost:8081)

* Ao abrir o link a seguinte mensagem será exibida: `{"success":false,"message":"No token provided."}`, significa que o acesso foi concluído. Porém, para ter acesso é necessário o token de usuário.

## Postman

Para testar os métodos HTTP de requisições, basta utilizar a aplicação [Postman](https://www.getpostman.com/),
que permite o envio e recebimento dados via requisições HTTP.
.

#### Requisições

*  Para adicionar um usuário através do Postman, devemos digitar a seguinte rota: `http://localhost:8080/api/userManager/create`

O método para adicionar usuario deve ser o ***POST*** e na subseção ***BODY*** deve conter os respectivos atributos do usuario, que são:
name, registration, sector, hospital, password.
Non
Ao clicar em ***SEND*** , será exibido um ***JSON*** com as informações do usuario , isso confirmará o cadastro do usuário.


 * Para logar um usuário através do Postman, devemos digitar a seguinte rota: `http://localhost:8081/api/userManager/login`

 O método para ***LOGIN***, deve ser o ***POST*** e na subseção ***BODY*** deve conter os atributos registration , password.

Ao clicar em ***SEND*** , será exibido um ***JSON*** com o status de sucesso ao logar , uma messagem indicando sucesso , o token, id do usuario , isso confirmará o sucesso ao logar o usuário.

* Para Visualizar um usuário através do Postman, devemos digitar a seguinte rota: `http://localhost:8080/api/userManager/listById`, o id e gerado no momento da criação do usuário.

O método para ***VIEW***, deve ser o ***GET*** .

Ao clicar em ***SEND*** , será exibido um ***JSON*** , informando o sucesso ou a falha da visualização e uma mensagem.

No caso acima , houve falha pois para acessar a visualizaçao é necessário um token do usuário.

Para ter sucesso ao visualizar a informações do usuario logado , na subseção HEADERS deverá conter `x-access-token` tendo o valor do token válido  do usuário, com isso será possível obter sucesso na visualização.

* Para Editar um usuário através do Postman, devemos digitar a seguinte rota: `http://localhost:8080/api/userManager/editUser`, o id e gerado no momento da criação do usuário.

O método para editar usuario deve ser o ***PUT*** e na subseção ***BODY*** deve conter os respectivos atributos do usuario que serão editados.

Ao clicar em ***SEND*** , será exibido um ***JSON*** com status e mensagem indicando sucesso ou falha na edição

No caso acima , houve falha pois para acessar a edição é necessário um token do usuário ao qual terá o perfil editado.

Para ter sucesso ao editar a informações do usuario logado , na subseção HEADERS deverá conter `x-access-token` tendo o valor do token válido  do usuário, com isso será possível obter sucesso na edição.

* Para Visualizar todos os usuário através do Postman, devemos digitar a seguinte rota: `http://localhost:8080/api/userManager/listUser`.

O método para visualizar todos os usuarios deve ser o ***GET*** e na subseção ***BODY*** deve conter o token.

No caso acima , houve falha pois para acessar a visualização da lista de usuários é necessário um token do usuário logado.

Para ter sucesso ao visualizar a lista de usuários, o usuario logado, na subseção HEADERS deverá conter `x-access-token` tendo o valor do token válido  do usuário, com isso será possível obter sucesso na visualização da lista de usuários.


##### Requisições externas

Para uso da API se faz necessário o uso do ***DOCKER*** portanto , para a utilização do localhost , o IP será `172.18.0.1`.

## Links

Para ir para o projeto oficial clique <a href="https://github.com/fga-gpp-mds/2018.1-Dulce_App">aqui</a>

Para ir para o github pages do projeto clique <a href= 'https://fga-gpp-mds.github.io/2018.1-Dulce_App/'>aqui </a>

# Dulce-API

Dulce-API provê API's Restful para o desenvolvimento de Apps utilizando microsserviços. 
Cada API descreve apenas uma funcionalidade de um sistema, isso torna a aplicação modular e favorece o baixo acoplamento.

## Instalação e uso

Para utilizar as API disponíveis e customizá-las para se adequar ao seu sistema, basta seguir os seguintes passos :

Clone o repositório utilizando o comando (o símbolo "$" não deve ser copiado. Apenas indica que tal comando 
deve ser digitado em seu terminal) :

`$ git clone origin https://github.com/fga-gpp-mds/dulce-api `

Entre no diretório em que há o arquivo Dockerfile. Se você estiver utilizando o terminal linux, basta digitar :

`$ cd dulce-api;cd <nome da API desejada. Ex. criarGestor>;ls`

Observe que há um arquivo Dockerfile neste diretório. Agora basta digitar o seguinte comando :

`$ sudo docker-compose up --build`

Observe a execução, e quando surgir no terminal a seguinte expreção: _Funcionou_ , acesse no seu navegador a porta 8080 
do servidor local por meio do link [localhost:8080](localhost:8080)

## Postman

Para testar os métodos HTTP de requisições, basta utilizar a aplicação [Postman](https://www.getpostman.com/),
que permite o envio e recebimento dados via requisições HTTP.
.  

# desafio-nodejs

## Como Usar

levante um mongo na porta `32768` com uma database `economybrasil`, ou
configure sua instancia em `server/src/db.js`

Para executar:

para o server

```
$ cd ./server
$ yarn
$ yarn start

```

ou caso uso npm

```
$ cd ./server
$ npm install
$ npm start

```

para o client

```
$ cd ./client
$ yarn
$ yarn start

```

ou caso uso npm

```
$ cd ./client
$ npm install
$ npm start

```

# consultórios médicos

Desenvolver aplicação usando Nodejs e Mongodb (Use outro banco caso não se sinta confortável)  
Commitar sempre que achar necessário.

#### introdução

O sistema deve ter uma interface web, sem necessidade de login. CRUD simples para as entidades criadas. Cadastro de médicos, especialidades e consultórios.

#### entidades

Especialidades: nome da especialidade.  
Médico: nome do médico.  
Consultório: nome do consultório.

#### observações

-   O consultório pode ter várias especialidades.
-   O médico pode ter várias especialidades.
-   Somente poderá cadastrar médicos ao consultório se o consultório tiver a especialidade que o médico tem.
-   Um médico pode atender em vários consultórios.
-   Um consultório pode ter vários médicos.

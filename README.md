# DESAFIO PUMA
## Aplicação Web de Usuários Favoritados do GitHub
190091681 - Lucas Gabriel da Silva Antunes

## Quick Start

Instruções de inicialização do projeto

1. Clone o repositório Git: `git@github.com:LucasGSAntunes/puma_challenge.git`;
2. Navegue até a branch `dev`: `git checkout dev`
3. Entre na pasta ./backend;
4. Instale as dependências com o comando: `npm install`
5. Inicie o servidor com o comando: `npm run dev`
6. O servidor deve estar rodando na *porta* `3001`
7. Entre na pasta ./frontend;
8. Instale as dependências com o comando: `npm install`
9. Inicie o servidor com o comando: `npm run dev`
10. O frontend da aplicação deve estar rodando na *porta* `9000` por padrão

## User Inteface
Rota da interface: `http://localhost:9000/#/users`

![image](https://github.com/user-attachments/assets/93fb1924-a38e-464e-91d8-4ab64562f95b)
![image](https://github.com/user-attachments/assets/d3654f2a-1632-42f4-bee5-454740e3cf56)

## UserAPI
Todas as rotas da api utilizam a *rota base*: `http://localhost:3001/api`

*TESTES*: `npm test`

![image](https://github.com/user-attachments/assets/27666ce5-ecb5-4b6b-b243-e69c1e2e3b26)


### `POST` `/users` - Adicionar um novo usuário favorito

#### Body Request Example
```
{
  "username": "testuser"
}
```

#### Response
##### `201` - Created

##### `409` - Usuário já existe!
```
success: false, message: User already exists!
```

##### `404` - Usuário não encontrado!
```
success: false, message: User not found!
```


##### `400` - ERROR!
```
success: false, message: error.message
```

### `GET` `/users` - Buscar usuários favoritos

#### Body Request Example
```
```

#### Response
##### `200` - OK
```
[{
"user":{
  "id":98185010,"name":"Lucas Gabriel da Silva Antunes","username":"lucasgsantunes","avatar":"https://avatars.githubusercontent.com/u/98185010?v=4","url":"https://github.com/LucasGSAntunes","starred":false
  }
},
{"user":{
  "id":57416584,"name":"Luis Guilherme Borges ","username":"borges061","avatar":"https://avatars.githubusercontent.com/u/57416584?v=4","url":"https://github.com/Borges061","starred":false
  }
}
{"user": {
  "id":61599949,"name":"EdsonMoreira","username":"edsonmjr","avatar":"https://avatars.githubusercontent.com/u/61599949?v=4","url":"https://github.com/EdsonMJr","starred":false
  }
}]
```


##### `400` - ERROR!
```
success: false, message: error.message
```


### `DELETE` `/users/${username}` - Adicionar um novo usuário favorito

#### Body Request Example
```
{
  "username": "testuser"
}
```

#### Response
##### `200` - OK

##### `400` - ERROR!
```
success: false, message: error.message
```

### `PATCH` `/users/${username}/toggle_star` - Adicionar um novo usuário favorito

#### Body Request Example
```
{
  "username": "testuser"
}
```

#### Response
##### `200` - OK

##### `400` - ERROR!
```
success: false, message: error.message
```

## DOD - Definition of done:
### API
- [x] O utilizador poderá adicionar o máximo de 5 usuários favoritos;
- [x] O utilizador não poderá adicionar um usuário que já foi adicionado na lista;
- [x] Somente 1 usuário pode ser marcado com uma estrela. Se o utilizador tentar marcar um segundo usuário com uma estrela, o usuário anteriormente marcado deixará de ter a estrela;
- [x] O utilizador poderá ordenar a lista de usuários em ordem alfabética de nome.
- [x] Utilizar testes unitários no backend;
### Frontend
- [x] Caso o usuário tente inserir um username que não existe no GitHub, uma mensagem de erro deve ser exibida;
- [x] Exibir mensagem de erro caso o usuário tente adicionar um novo username quando o limite de favoritos tiver sido alcançado;

### Não funcionais
- [x] Não é necessário salvar a lista de favoritos em banco dados, podendo ficar somente em memória;
- [x] Utilizar os princípios de programação orientada a objetos, design patterns e arquitetura limpa quando apropriado.

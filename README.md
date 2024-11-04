# DESAFIO PUMA
## Aplicação Web de Usuários Favoritados do GitHub
190091681 - Lucas Gabriel da Silva Antunes

## Quick Start

Instruções de inicialização do projeto

1. Clone o repositório Git;
2. Entre na pasta ./backend;
3. Instale as dependências com o comando: `npm install`
4. Inicie o servidor com o comando: `npm run dev`
5. O servidor deve estar rodando na *porta* `3001`
6. Entre na pasta ./frontend;
7. Instale as dependências com o comando: `npm install`
8. Inicie o servidor com o comando: `npm run dev`
9. O frontend da aplicação deve estar rodando na *porta* `9000` por padrão

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

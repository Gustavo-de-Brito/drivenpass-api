## Rotas de Autenticação

#### POST **/sign-up**
- formato do body

```
{
	email: "cleiton@email.com",
	password: "minha-senha"
}
```

#### POST **/sign-in**
- formato do body

```
{
	email: "cleiton@email.com",
	password: "minha-senha"
}
```

- a API retornará um objeto no seguinte formato:

```
{
	token: "meu-token-de-acesso"
}
```

## Rotas de Cartão

#### POST **/cards**
- o header deve incluir um token no padrão *Bearer* que é gerado no login
- formato do body

```
{
	title: "meu cartão de crédito",
	cardNumber: "0000000000000000000",
	ownerName: "Cleiton P Silva",
	securityCode: "123",
	expirationDate: "10/23"
	password: "1234",
	isVirtual: true
	cardType: "credito"
}
```
- **cardType** se limita as opções: "credito", "debito" e "credito-debito"

#### GET **/cards**
- o header deve incluir um token no padrão *Bearer* que é gerado no login
- Nessa rota pode ser passada uma query com nome **id**, quando não é passado será retornado todos os cartões do usuário, quando passado o id será retornado o cartão com aquele id em específico
- a API retornará um objeto no seguinte formato (quando pesquisaddo por um cartão em específico):

```
{
	id: 12,
	title: "meu cartão de crédito",
	cardNumber: "0000000000000000000",
	ownerName: "Cleiton P Silva",
	securityCode: "123",
	expirationDate: "10/23"
	password: "1234",
	isVirtual: true
	cardType: "CREDITO",
	userId: 12
}
```

- A API também pode retornar um array com objetos no formato acima, quando não for passado um **id** na query string

#### DELETE **/cards/:id**
- o header deve incluir um token no padrão *Bearer* que é gerado no login
- Nessa rota pode ser passado um params com o id do cartão que se deseja deletar

## Rotas de Credenciais

#### POST **/credentials**
- o header deve incluir um token no padrão *Bearer* que é gerado no login
- formato do body

```
{
	title: "minha credencial de login",
	url: "https://locallogin.com"
	username: "name-user",
	password: "abc123"
}
```

#### GET **/credentials**
- o header deve incluir um token no padrão *Bearer* que é gerado no login
- Nessa rota pode ser passada uma query com nome **id**, quando não é passado será retornado todas as credenciais do usuário, quando passado o id será retornado a credencial com aquele id em específico
- a API retornará um objeto no seguinte formato (quando pesquisaddo por uma credencial em específico):

```
{
	id: 12,
	title: "minha credencial de login",
	url: "https://locallogin.com"
	username: "name-user",
	password: "abc123",
	userId: 12
}
```

- A API também pode retornar um array com objetos no formato acima, quando não for passado um **id** na query string

#### DELETE **/credentials/:id**
- o header deve incluir um token no padrão *Bearer* que é gerado no login
- Nessa rota pode ser passado um params com o id da credencial que se deseja deletar

## Rotas de Notas

#### POST **/notes**
- o header deve incluir um token no padrão *Bearer* que é gerado no login
- formato do body

```
{
	title: "uma nota secreta",
	description: "informações confidenciais"
}
```

- **title** deve ter no máximo 50 caracteres
- **description** deve ter no máximo 1000 caracteres

#### GET **/notes**
- o header deve incluir um token no padrão *Bearer* que é gerado no login
- Nessa rota pode ser passada uma query com nome **id**, quando não é passado será retornado todas as notas do usuário, quando passado o id será retornado a nota com aquele id em específico
- a API retornará um objeto no seguinte formato (quando pesquisaddo por uma nota em específico):

```
{
	id: 12,
	title: "uma nota secreta",
	description: "informações confidenciais",
	userId: 12
}
```

- A API também pode retornar um array com objetos no formato acima, quando não for passado um **id** na query string

#### DELETE **/notes/:id**
- o header deve incluir um token no padrão *Bearer* que é gerado no login
- Nessa rota pode ser passado um params com o id da nota que se deseja deletar

## Rotas de Redes WIFI

#### POST **/wifis**
- o header deve incluir um token no padrão *Bearer* que é gerado no login
- formato do body

```
{
	title: "senha da faculdade",
	networkName: "FAC-234",
	password: "1234567"
}
```

#### GET **/wifis**
- o header deve incluir um token no padrão *Bearer* que é gerado no login
- Nessa rota pode ser passada uma query com nome **id**, quando não é passado será retornado todas as redes wifi do usuário, quando passado o id será retornado a rede wifi com aquele id em específico
- a API retornará um objeto no seguinte formato (quando pesquisaddo por uma rede wifi em específico):

```
{
	id: 12,
	title: "uma nota secreta",
	description: "informações confidenciais",
	userId: 12
}
```

- A API também pode retornar um array com objetos no formato acima, quando não for passado um **id** na query string

#### DELETE **/notes/:id**
- o header deve incluir um token no padrão *Bearer* que é gerado no login
- Nessa rota pode ser passado um params com o id da rede wifi que se deseja deletar

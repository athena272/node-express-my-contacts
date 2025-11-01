# 📇 My Contacts API

API REST desenvolvida em Node.js com Express para gerenciar contatos e categorias, utilizando PostgreSQL como banco de dados.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web para Node.js
- **PostgreSQL** - Banco de dados relacional
- **pg** - Cliente PostgreSQL para Node.js
- **nodemon** - Ferramenta de desenvolvimento que reinicia automaticamente o servidor

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (para rodar o PostgreSQL)
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositório>
cd node-express-my-contacts
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

## 🗄️ Configuração do Banco de Dados

### Opção 1: Docker (Recomendado)

1. **Suba o container PostgreSQL:**
```bash
docker run --name postgres-mycontacts -e POSTGRES_PASSWORD=root -e POSTGRES_USER=root -e POSTGRES_DB=mycontacts -p 5432:5432 -d postgres:latest
```

2. **Crie as tabelas:**
```bash
docker exec -i postgres-mycontacts psql -U root -d mycontacts < src/database/schema.sql
```

3. **Verifique se as tabelas foram criadas:**
```bash
docker exec -it postgres-mycontacts psql -U root -d mycontacts -c "\dt"
```

### Opção 2: PostgreSQL Local

Se você já tem PostgreSQL instalado localmente:

1. Crie o banco de dados:
```bash
createdb mycontacts
```

2. Execute o schema:
```bash
psql -U seu_usuario -d mycontacts -f src/database/schema.sql
```

3. Atualize as credenciais em `src/database/index.js` se necessário.

> 💡 **Nota:** Para mais detalhes sobre a configuração do Docker, consulte o arquivo `DOCKER_POSTGRES_SETUP.txt`

## 🔧 Configuração

O arquivo `src/database/index.js` contém as configurações de conexão com o banco:

```javascript
{
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
}
```

Ajuste essas configurações conforme necessário.

## 🏃 Como Rodar

Para iniciar o servidor em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

O servidor estará rodando em `http://localhost:3000`

Você verá as mensagens:
- `🔥 Connected to database 🔥` - Conexão com banco estabelecida
- `🔥 Server on fire 🔥 at http://localhost:3000` - Servidor iniciado

## 📁 Estrutura do Projeto

```
src/
├── index.js                      # Ponto de entrada da aplicação
├── routes.js                     # Definição de todas as rotas
├── database/
│   ├── index.js                  # Configuração de conexão PostgreSQL
│   └── schema.sql                # Script SQL para criar tabelas
└── app/
    ├── controllers/              # Controladores (lógica HTTP)
    │   ├── ContactController.js
    │   └── CategoryController.js
    └── repository/               # Camada de acesso a dados
        ├── ContactsRepository.js
        └── CategoriesRepository.js
```

## 📊 Estrutura do Banco de Dados

### Tabela: `categories`
- `id` (UUID) - Chave primária, gerado automaticamente
- `name` (VARCHAR) - Nome da categoria (obrigatório)

### Tabela: `contacts`
- `id` (UUID) - Chave primária, gerado automaticamente
- `name` (VARCHAR) - Nome do contato (obrigatório)
- `email` (VARCHAR) - Email único
- `phone` (VARCHAR) - Telefone (opcional)
- `category_id` (UUID) - Chave estrangeira referenciando `categories.id` (opcional)

## 🌐 Endpoints da API

### Contatos

#### `GET /contacts`
Lista todos os contatos.

**Query Params:**
- `orderBy` (opcional): `ASC` ou `DESC` (padrão: `ASC`)

**Exemplo:**
```bash
GET http://localhost:3000/contacts
GET http://localhost:3000/contacts?orderBy=DESC
```

**Resposta:**
```json
[
  {
    "id": "uuid-do-contato",
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "11999999999",
    "category_id": "uuid-da-categoria"
  }
]
```

#### `GET /contacts/:id`
Busca um contato específico pelo ID.

**Exemplo:**
```bash
GET http://localhost:3000/contacts/uuid-do-contato
```

**Resposta (200):**
```json
{
  "id": "uuid-do-contato",
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "11999999999",
  "category_id": "uuid-da-categoria"
}
```

**Resposta (404):**
```json
{
  "errorMessage": "Contact not found"
}
```

#### `POST /contacts`
Cria um novo contato.

**Body:**
```json
{
  "name": "Maria Santos",
  "email": "maria@example.com",
  "phone": "11988888888",
  "category_id": "uuid-da-categoria" // opcional
}
```

**Validações:**
- `name` é obrigatório
- `email` deve ser único

**Resposta (200):**
```json
{
  "id": "uuid-gerado",
  "name": "Maria Santos",
  "email": "maria@example.com",
  "phone": "11988888888",
  "category_id": "uuid-da-categoria"
}
```

**Resposta (400):**
```json
{
  "errorMessage": "Name is required"
}
// ou
{
  "errorMessage": "This e-mail is already in use"
}
```

#### `PUT /contacts/:id`
Atualiza um contato existente.

**Body:**
```json
{
  "name": "Maria Santos Silva",
  "email": "maria.silva@example.com",
  "phone": "11988888888",
  "category_id": "uuid-da-categoria" // opcional
}
```

**Validações:**
- `name` é obrigatório
- `email` deve ser único (exceto o próprio contato)

**Resposta (200):** Contato atualizado

**Resposta (404):**
```json
{
  "errorMessage": "Contact not found"
}
```

#### `DELETE /contacts/:id`
Remove um contato.

**Resposta (204):** Sem conteúdo (sucesso)

---

### Categorias

#### `GET /categories`
Lista todas as categorias.

**Query Params:**
- `orderBy` (opcional): `ASC` ou `DESC` (padrão: `ASC`)

**Exemplo:**
```bash
GET http://localhost:3000/categories
GET http://localhost:3000/categories?orderBy=DESC
```

**Resposta:**
```json
[
  {
    "id": "uuid-da-categoria",
    "name": "Trabalho"
  },
  {
    "id": "uuid-da-categoria-2",
    "name": "Família"
  }
]
```

#### `GET /categories/:id`
Busca uma categoria específica pelo ID.

**Exemplo:**
```bash
GET http://localhost:3000/categories/uuid-da-categoria
```

**Resposta (200):**
```json
{
  "id": "uuid-da-categoria",
  "name": "Trabalho"
}
```

**Resposta (404):**
```json
{
  "errorMessage": "Category not found"
}
```

#### `POST /categories`
Cria uma nova categoria.

**Body:**
```json
{
  "name": "Amigos"
}
```

**Validações:**
- `name` é obrigatório
- `name` deve ser único

**Resposta (200):**
```json
{
  "id": "uuid-gerado",
  "name": "Amigos"
}
```

**Resposta (400):**
```json
{
  "errorMessage": "Name is required"
}
// ou
{
  "errorMessage": "This category name is already in use"
}
```

#### `PUT /categories/:id`
Atualiza uma categoria existente.

**Body:**
```json
{
  "name": "Amigos Próximos"
}
```

**Validações:**
- `name` é obrigatório
- `name` deve ser único (exceto a própria categoria)

**Resposta (200):** Categoria atualizada

**Resposta (404):**
```json
{
  "errorMessage": "Category not found"
}
```

#### `DELETE /categories/:id`
Remove uma categoria.

**Resposta (204):** Sem conteúdo (sucesso)

> ⚠️ **Nota:** Ao deletar uma categoria, os contatos que referenciam essa categoria manterão o `category_id` (sem cascade delete).

## 🧪 Exemplos de Uso com cURL

### Criar uma categoria
```bash
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Trabalho"}'
```

### Criar um contato
```bash
curl -X POST http://localhost:3000/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "11999999999",
    "category_id": "uuid-da-categoria"
  }'
```

### Listar todos os contatos
```bash
curl http://localhost:3000/contacts
```

### Buscar um contato por ID
```bash
curl http://localhost:3000/contacts/uuid-do-contato
```

### Atualizar um contato
```bash
curl -X PUT http://localhost:3000/contacts/uuid-do-contato \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva Santos",
    "email": "joao.santos@example.com",
    "phone": "11999999999"
  }'
```

### Deletar um contato
```bash
curl -X DELETE http://localhost:3000/contacts/uuid-do-contato
```

## 🔍 Comandos Úteis Docker

```bash
# Verificar se o container está rodando
docker ps

# Iniciar o container (se estiver parado)
docker start postgres-mycontacts

# Parar o container
docker stop postgres-mycontacts

# Ver logs do container
docker logs postgres-mycontacts

# Acessar o PostgreSQL interativamente
docker exec -it postgres-mycontacts psql -U root -d mycontacts
```

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo de desenvolvimento com nodemon

## 🏗️ Arquitetura

O projeto segue o padrão **MVC (Model-View-Controller)** adaptado:

- **Models**: Representados pelas tabelas do banco de dados
- **Views**: API REST retorna JSON (não há interface web)
- **Controllers**: `src/app/controllers/` - Gerenciam as requisições HTTP
- **Repository**: `src/app/repository/` - Camada de acesso a dados (queries SQL)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

athena272

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

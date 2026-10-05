# 📡 MiniSense API

API REST para gerenciamento e monitoramento de dispositivos de sensores (IoT), streams de dados e medições.

Desenvolvida em **Node.js** com **TypeScript**, **Express**, **Prisma ORM** e **PostgreSQL**, totalmente containerizada via **Docker** e **Docker Compose**.

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** TypeScript
- **Runtime:** Node.js v22
- **Framework Web:** Express
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL
- **Validação / Utilitários:** Zod, Crypto
- **Testes:** Vitest, Supertest
- **Containerização:** Docker e Docker Compose

---

## 🚀 Pré-requisitos

Para executar a aplicação localmente, certifique-se de ter instalado em sua máquina:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

### Opcional — execução sem Docker

Caso queira executar a aplicação sem Docker:

- [Node.js](https://nodejs.org/) v22.x ou superior
- [npm](https://www.npmjs.com/)

---

## 📦 Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/minisense-api.git
cd minisense-api


```
### 2. Criar o arquivo de variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto contendo:

```bash
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/meu_projeto?schema=public"



```
### 3. Subir os containers

O Docker Compose será responsável por iniciar a API e o PostgreSQL, instalar as dependências, realizar o build da aplicação e iniciar os serviços.

```bash
docker compose up -d --build



```
### 4. Executar as migrations

Após os containers estarem em execução, aplique as migrations do Prisma:

```bash
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma db seed




```
## 🔍 Como Testar e Acessar
### 7. Acessar a API

### Swagger

Documentação interativa da API:

http://localhost:3000/docs

### Health Check

Endpoint para verificar se a API está funcionando:

http://localhost:3000/health

Também é possível verificar o Health Check pelo terminal:

```bash
curl http://localhost:3000/health

```

## 🧪 Testes Automatizados
### 8. Testes

### Executar os testes

```bash
docker compose exec api npm run test
docker compose exec api npm run test -- --watch




```
## 🗄️ Prisma
### 9. Prisma

### Prisma Studio

Para visualizar e gerenciar os dados do banco através do Prisma Studio:

```bash
docker compose exec api npx prisma studio
docker compose exec api npx prisma generate
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma db seed




```
## 🐳 Docker
### 10. Docker

### Iniciar a aplicação

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f
docker compose down
docker compose down -v




```
## 🔐 Variáveis de Ambiente
### 12. Variáveis de ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `PORT` | Porta utilizada pela API | `3000` |
| `DATABASE_URL` | URL de conexão com o PostgreSQL | `postgresql://postgres:postgres@postgres:5432/meu_projeto?schema=public` |

> **Nunca versione informações sensíveis**, como senhas, tokens ou chaves privadas. Mantenha o arquivo `.env` no `.gitignore`.


## 📚 Documentação da API
### 13.Documentação da API

A documentação completa dos endpoints está disponível através do Swagger:

http://localhost:3000/docs

O Swagger permite visualizar os endpoints disponíveis, consultar seus parâmetros e testar as requisições diretamente pelo navegador.

---

## ❤️ Health Check
### 14.Health Check

O endpoint de Health Check pode ser utilizado para verificar se a API está disponível:

http://localhost:3000/health

Ou através do terminal:

```bash
curl http://localhost:3000/health

```

## 📌 Comandos Úteis
### 15. Comandos úteis

### Iniciar a aplicação

```bash
docker compose up -d --build
```
### Verificar o status dos containers
```bash
docker compose ps

```
### Visualizar logs
```bash
docker compose logs -f

```
### Executar migrations
```bash
docker compose exec api npx prisma migrate deploy
```
### Executar seed
```bash
docker compose exec api npx prisma db seed
```
### Executar testes
```bash
docker compose exec api npm run test
```
### Abrir o Prisma Studio
```bash
docker compose exec api npx prisma studio
```
### Parar a aplicação
```bash
docker compose down
```
### Parar a aplicação e remover os volumes
```bash
docker compose down -v




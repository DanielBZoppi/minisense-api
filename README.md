# 📡 MiniSense API

API REST para gerenciamento e monitoramento de dispositivos de sensores (IoT), streams de dados e medições de medição. Desenvolvida em **Node.js** com **TypeScript**, **Express**, **Prisma ORM** e banco de dados **PostgreSQL**, totalmente containerizada via **Docker**.

<Image src="image_agent_tag_10616766519917896423" alt="Arquitetura do backend Node.js com Prisma e PostgreSQL" caption="Arquitetura de Backend com Node.js, Prisma e PostgreSQL" />

---

## 🛠️ Tecnologias Utilizadas

* **Linguagem:** TypeScript
* **Runtime:** Node.js (v22)
* **Framework Web:** Express
* **ORM:** Prisma
* **Banco de Dados:** PostgreSQL
* **Validação / Utilitários:** Zod, Crypto
* **Testes:** Vitest, Supertest
* **Containerização:** Docker & Docker Compose

---

## 🚀 Pré-requisitos

Para executar a aplicação localmente, certifique-se de ter instalado em sua máquina:

* [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)
* [Git](https://git-scm.com/)

*(Opcional caso queira rodar sem Docker)*:
* [Node.js](https://nodejs.org/) (v22.x ou superior)
* [npm](https://www.npmjs.com/)

---

## 📦 Passos para Instalação e Execução

### 1. Clonar o repositório
```bash
git clone [https://github.com/seu-usuario/minisense-api.git](https://github.com/seu-usuario/minisense-api.git)
cd minisense-api

### 2. Criar o arquivo de variáveis de ambiente (.env):
Crie um arquivo .env na raiz do projeto contendo:

Snippet de código
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/meu_projeto?schema=public"

### 3. Subir os containers (API + PostgreSQL):
O Docker Compose se encarregará de instalar os pacotes do package.json, rodar o build do TypeScript, aplicar as migrations do prisma e iniciar a aplicação:

Bash
docker compose up -d --build
4. Executar as Migrations e Seed do Banco de Dados:
Para popular o banco com as unidades de medida padrão e garantir o usuário inicial:

Bash
docker compose exec api npx prisma db seed
🔍 Como Testar e Acessar
Swagger (Documentação Interativa): http://localhost:3000/docs

Health Check: http://localhost:3000/health

Executar os Testes Automatizados:

Bash
docker compose exec api npm run test

📡 MiniSense API
API REST para gerenciamento e monitoramento de dispositivos de sensores (IoT), streams de dados e medições.

Desenvolvida com Node.js, TypeScript, Express, Prisma ORM e PostgreSQL, totalmente containerizada com Docker e Docker Compose.

🛠️ Tecnologias Utilizadas
Linguagem: TypeScript

Runtime: Node.js v22

Framework Web: Express

ORM: Prisma

Banco de Dados: PostgreSQL

Validação e utilitários: Zod, Crypto

Testes: Vitest, Supertest

Containerização: Docker e Docker Compose

🚀 Pré-requisitos
Para executar a aplicação localmente, certifique-se de ter instalado:

Docker

Docker Compose

Git

Opcional — execução sem Docker
Caso queira executar a aplicação diretamente na máquina, também será necessário:

Node.js v22.x ou superior

npm

📦 Instalação e Execução
1. Clonar o repositório
git clone https://github.com/seu-usuario/minisense-api.git
cd minisense-api

2. Criar o arquivo de variáveis de ambiente
Crie um arquivo .env na raiz do projeto:

PORT=3000
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/meu_projeto?schema=public"

Importante: ajuste a DATABASE_URL caso as credenciais, porta ou nome do banco sejam diferentes no seu ambiente.

3. Subir os containers
O Docker Compose será responsável por iniciar os serviços necessários, instalar as dependências, realizar o build da aplicação e iniciar os containers.

docker compose up -d --build

Para acompanhar os logs:

docker compose logs -f

4. Executar as migrations e o seed
Após os containers estarem em execução, aplique as migrations do Prisma:

docker compose exec api npx prisma migrate deploy

Em seguida, execute o seed para popular o banco de dados com as unidades de medida padrão e garantir o usuário inicial:

docker compose exec api npx prisma db seed

🔍 Acessando a API
Após iniciar a aplicação, os seguintes endpoints estarão disponíveis:

Swagger
Documentação interativa da API:

http://localhost:3000/docs

Health Check
Endpoint para verificar se a API está funcionando corretamente:

http://localhost:3000/health

🧪 Testes
Para executar os testes automatizados:

docker compose exec api npm run test

Para executar os testes em modo watch:

docker compose exec api npm run test -- --watch

🗄️ Prisma
Para acessar o Prisma Studio e visualizar os dados do banco:

docker compose exec api npx prisma studio

Caso seja necessário gerar novamente o Prisma Client:

docker compose exec api npx prisma generate

🐳 Docker
Parar os containers
docker compose down

Parar os containers e remover os volumes
Atenção: isso removerá os dados persistidos do PostgreSQL.

docker compose down -v

Reconstruir a aplicação
docker compose up -d --build

Verificar os containers em execução
docker compose ps

📁 Estrutura do Projeto
Uma estrutura esperada para o projeto é:

minisense-api/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   ├── schemas/
│   └── server.ts
├── tests/
├── .env
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md

🔐 Variáveis de Ambiente
Variável	Descrição	Exemplo
PORT	Porta utilizada pela API	3000
DATABASE_URL	URL de conexão com o PostgreSQL	postgresql://postgres:postgres@postgres:5432/meu_projeto?schema=public

Nunca versione informações sensíveis, como senhas, tokens ou chaves privadas. Utilize o .env localmente e mantenha-o no .gitignore.

📚 Principais Endpoints
A documentação completa dos endpoints está disponível através do Swagger:

http://localhost:3000/docs

A partir dela é possível visualizar, testar e consultar os contratos da API.

❤️ Health Check
Para verificar rapidamente se a API está disponível:

curl http://localhost:3000/health

📌 Comandos Úteis
Iniciar a aplicação
docker compose up -d --build

Ver logs
docker compose logs -f

Ver status dos containers
docker compose ps

Executar migrations
docker compose exec api npx prisma migrate deploy

Executar seed
docker compose exec api npx prisma db seed

Executar testes
docker compose exec api npm run test

Abrir Prisma Studio
docker compose exec api npx prisma studio

Parar a aplicação
docker compose down

👨‍💻 Desenvolvimento
Para contribuir com o projeto:

Faça um fork do repositório.

Crie uma branch para sua alteração:

git checkout -b feature/minha-feature

Faça as alterações necessárias.

Execute os testes:

docker compose exec api npm run test

Faça o commit:

git add .
git commit -m "feat: adiciona minha feature"

Envie a branch:

git push origin feature/minha-feature

Abra um Pull Request.

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
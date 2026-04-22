# 📦 Matriculas API

Este é um projeto acadêmico da cadeira de Projeto e Arquitetura de Software que implementa uma aplicação seguindo o padrão arquitetural **MVC** (junto ao padrão Repository), sem o uso de frameworks que abstraem essa arquitetura estrutural.

---

## 🚀 Tecnologias utilizadas

- **Node.js**
- **TypeScript**
- **Express** (Roteamento e Servidor Web)
- **PostgreSQL** (Banco de Dados)
- **Docker + Docker Compose** (Containerização e Ambiente)
- **tsx** (Execução em modo desenvolvimento com Hot Reload)

---

## 📁 Estrutura do Projeto

```bash
src/
  config/         # Configurações globais (ex: conexão com o banco em db.ts)
  controllers/    # Lógica de controle e tratamento de requisições HTTP
  exceptions/     # Classes de erro customizadas do sistema
  models/         # Regras de negócio e representação das entidades
  repositories/   # Padrão Repository para persistência e consultas no banco de dados
  routes/         # Mapeamento dos endpoints para os respectivos controllers
  apiContracts.ts # Contratos da API mapeando dados de entrada e saída
  index.ts        # Ponto de entrada da aplicação
data/
  init.sql        # Script de inicialização das tabelas no PostgreSQL
  cursos_matriculas.csv # Carga inicial de dados utilizados no banco
```

---

## ⚙️ Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado na sua máquina:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- Docker Compose

---

## ▶️ Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/gabriel-schmitt/matriculas-api.git
cd matriculas-api
```

---

### 2. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto contendo as seguintes variáveis:

```env
PORT=3000

# Configurações do Banco de Dados
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=cursos_db
```

---

### 3. Subir a aplicação com Docker

Certifique-se de que o daemon do Docker está em execução e rode:

```bash
docker compose up -d
```

> **Nota:** Esse comando criará os contêineres (`app` e `db`) e provisionará o banco de dados PostgreSQL. Na inicialização do banco, o volume definido em `docker-compose.yml` lerá automaticamente os arquivos em `/data` (`init.sql` e `.csv`) para popular os dados. Este processo de normalização do banco de dados é esperadamente lento na primeira vez (quando ainda não há volume na máquina local). Aguarde ele finalizar para utilizar a aplicação.

### 4. Acessar os Endpoints da API

A aplicação estará disponível em `http://localhost:3000`.

**Alguns dos endpoints principais:**
- **GET** `http://localhost:3000/api/cursos`
- **GET** `http://localhost:3000/api/ies`
- **GET** `http://localhost:3000/api/matriculas`

> 📘 **Dica:** Os contratos da API (incluindo parâmetros de consulta `query params` esperados e o formato exato das respostas) podem ser consultados diretamente no arquivo [src/apiContracts.ts](src/apiContracts.ts).

---

## 💻 Rodando sem Docker (opcional)

Caso queira rodar o Node integrado localmente fora do container, certifique-se de alterar o `DB_HOST` no `.env` para `localhost` (assumindo que o banco está exposto ou rodando local).

```bash
npm install
npm run dev
```

---

## 📌 Observações

- O ambiente utiliza `tsx` em watch mode (`npm run dev`), garantindo que o servidor seja reiniciado automaticamente a cada alteração salva no código ("hot reload").
- A arquitetura está desacoplada em componentes claros: Roteador, Controller, Model e Repository.

---

## ⚠️ Trobleshooting (Se algo der errado)

- Verifique se as portas **3000** (Node) e **5432** (Postgres) não estão sendo usadas por outra aplicação.
- Para verificar logs de erro do banco de dados, rode: `docker compose logs db`
- Caso os dados não sejam inicializados no Postgres, remova o volume criado antes de subir novamente: `docker compose down -v`

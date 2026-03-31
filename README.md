# 📦 Matriculas (API)

Este é um simples projeto acadêmico da cadeira de Projeto e Arquitetura de Software para desenvolvimento que implementa uma aplicação seguindo padrão **MVC ou MVVM**<!-- TODO: alterar quando decidir -->, sem uso de frameworks que abstraem essa arquitetura.

---

## 🚀 Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- Docker + Docker Compose
- tsx (execução em modo desenvolvimento)

---

## 📁 Estrutura

```bash
src/
  index.ts
```

---

## ⚙️ Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- Node.js
- Docker
- Docker Compose

---

## ▶️ Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone <url-do-repo>
cd <nome-do-repo>
```

---

### 2. Criar arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=3000
```

---

### 3. Rodar com Docker

Importante abrir o Docker antes de executar o comando!

```bash
docker compose up
```

## Esse comando cria, configura e inicia todos os contêineres, redes e volumes definidos no arquivo docker-compose.yml

### 4. Acessar no navegador

Abra:

```bash
http://localhost:3000
```

Se tudo estiver certo, você verá a resposta da API.

---

## 💻 Rodando sem Docker (opcional)

Caso queira rodar direto na máquina:

```bash
npm install
npm run dev
```

---

## 📌 Observações

- O projeto roda em modo desenvolvimento (hot reload)
- Alterações no código são refletidas automaticamente

---

## ⚠️ Importante

Se algo não funcionar:

- Verifique se o Docker está rodando
- Verifique se a porta 3000 está livre
- Verifique se o `.env` foi criado corretamente

---

Pronto. Se chegou até aqui, o projeto já deve estar rodando 🚀

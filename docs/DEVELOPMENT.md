# 🛠️ Guia de Desenvolvimento – Sistema de Reservas Inteligente – SEMCULT

Este documento orienta sobre como configurar o ambiente de desenvolvimento, rodar o projeto localmente e seguir boas práticas para contribuir no **Sistema de Reservas Inteligente – SEMCULT**.

**Arquitetura do projeto:**

- **Backend:** FastAPI
- **Frontend:** React + TailwindCSS
- **Banco de Dados:** PostgreSQL

---

## 1. Pré-requisitos

Certifique-se de ter instalado:

- **Python 3.10+**
- **PostgreSQL**
- **Git**
- **Node.js 18+ e npm**

> [!TIP]
> Use um **virtual environment** para isolar dependências Python.

---

## 2. Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/reserva-inteligente-semcult.git
cd reserva-inteligente-semcult
```

---

## 3. Configurando o Backend (FastAPI)

1. Entre na pasta do backend:

   ```bash
   cd backend
   ```

2. Crie e ative o **virtual environment**:

   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # Linux / Mac
   source venv/bin/activate
   ```

3. Instale as dependências:

   ```bash
   pip install -r requirements.txt
   ```

4. Configure o banco de dados no arquivo `.env`:

   ```bash
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=semlcult_dev
   ```

5. Rode o FastAPI:

   ```bash
   uvicorn app.main:app --reload
   ```

> [!NOTE]
> O backend ficará disponível em `http://127.0.0.1:8000`.

---

### Estrutura do Backend

```bash
backend/
├── app/
│   ├── main.py           # Ponto de entrada
│   ├── routes/           # Rotas organizadas por módulo
│   ├── models/           # Modelos ORM (SQLAlchemy)
│   ├── schemas/          # Validação/serialização (Pydantic)
│   ├── services/         # Lógica de negócio
│   └── core/             # Configurações gerais
└── requirements.txt
```

---

## 4. Configurando o Frontend (React + TailwindCSS)

1. Entre na pasta do frontend:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

> [!NOTE]
> O frontend ficará disponível em `http://localhost:3000` ou na porta exibida pelo terminal.
> Certifique-se de que o backend esteja rodando para que a comunicação via API funcione.

---

### Estrutura do Frontend

```bash
frontend/
├── src/
├── public/
└── package.json
```

---

## 5. Estrutura Geral do Projeto

```bash
reserva-inteligente-semcult/
├── backend/          # FastAPI
├── frontend/         # React + TailwindCSS
├── database/         # Scripts SQL adicionais
├── docs/             # Documentação acadêmica e técnica
├── .env.example      # Exemplo de variáveis de ambiente
└── README.md
```

---

## 6. Boas Práticas

- Use **branches separadas** para cada feature ou bugfix.
- Escreva **commits claros e descritivos**.
- Teste localmente antes de enviar Pull Requests.
- Organize o backend em `routes/`, `models/`, `schemas/` e `services/`.
- Organize o frontend em `components/`, `pages/` e `services/`.
- Utilize **tipagem explícita** no Python e **componentização** no React.
- Padronize nomes de rotas e funções seguindo convenções REST.

---

## 7. Contribuindo

- Leia [CONTRIBUTING.md](../CONTRIBUTING.md) antes de enviar Pull Requests.
- Teste as alterações localmente.
- Siga os padrões de código e estilo do projeto.

---

Com este guia, qualquer desenvolvedor consegue **configurar, rodar e contribuir** com o **Sistema de Reservas Inteligente – SEMCULT**, mantendo o projeto **padronizado, escalável e pronto para produção**.

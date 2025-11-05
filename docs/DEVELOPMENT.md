# 🛠️ Guia de Desenvolvimento – Sistema de Reservas Inteligente – SEMCULT

Este documento orienta sobre como configurar o ambiente de desenvolvimento, rodar o projeto localmente e boas práticas para contribuir no **Sistema de Reservas Inteligente – SEMCULT**.

A arquitetura do projeto é:

- **Backend:** FastAPI
- **Frontend:** React e TailwindCSS
- **Banco de Dados:** PostgreSQL

---

## 1. Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Python 3.10+**
- **PostgreSQL**
- **Git**
- **Node.js 18+ e npm**

> [!TIP]
> Use um **virtual environment** para isolar dependências Python.

---

## 2. Clonando o Repositório

No terminal:

```bash
git clone https://github.com/seu-usuario/reserva-inteligente-semcult.git
cd reserva-inteligente-semcult
```

---

## 3. Configurando o Backend (FastAPI)

Crie e ative o **virtualenv**:

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux / Mac
source venv/bin/activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

---

## 4. Configuração do Banco de Dados

1. Crie um banco PostgreSQL chamado `semlcult_dev`.

2. Configure o arquivo `.env` com os dados do banco:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=semlcult_dev
   ```

3. Rode a inicialização do banco (se houver script SQL):

```bash
psql -U seu_usuario -d semlcult_dev -f database/init.sql
```

---

## 5. Rodando o Backend

No diretório do backend:

```bash
cd backend
uvicorn app.main:app --reload
```

O backend FastAPI ficará disponível em:

```
http://127.0.0.1:8000
```

## 6. Configurando o Frontend (React)

No diretório do frontend:

```bash
cd frontend
npm install
```

Para iniciar o servidor de desenvolvimento React:

```bash
npm start
```

O frontend ficará disponível em:

```text
http://localhost:3000
```

> [!NOTE]
> O frontend React se comunica com o backend FastAPI via API REST. Certifique-se que o backend esteja rodando antes de iniciar o React.

---

## 7. Estrutura de Pastas

```bash
reserva-inteligente-semcult/
├── backend/          # FastAPI
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── services/
│   └── requirements.txt
├── frontend/         # React
│   ├── src/
│   ├── public/
│   └── package.json
├── database/         # Scripts SQL adicionais
├── docs/             # Documentação acadêmica e técnica
├── .env.example      # Exemplo de variáveis de ambiente
└── README.md
```

---

## 8. Boas Práticas

- Use **branches** separadas para cada feature ou bugfix.
- Escreva **commits claros** e **descritivos**.
- Teste localmente antes de enviar Pull Requests.
- Organize o backend em `routes/`, `models/`, `schemas/` e `services/`.
- Organize o frontend em `components/`, `pages/` e `services/`.

---

## 9. Contribuindo

- Leia [CONTRIBUTING.md](../CONTRIBUTING.md) antes de enviar Pull Requests.
- Teste as alterações localmente.
- Siga os padrões de código e estilo do projeto.

---

Com este guia, qualquer desenvolvedor consegue configurar, rodar e contribuir com o **Sistema de Reservas Inteligente – SEMCULT**, usando **FastAPI no backend** e **React no frontend**.

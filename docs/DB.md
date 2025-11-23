# 📘 Guia Básico de uso do Supabase

Este guia traz apenas o essencial para integrar o **Supabase** ao **FastAPI**, de forma simples e prática.

---

## 1. Configuração do Supabase

Crie um arquivo `.env` dentro da pasta **backend/**:

```env
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_KEY=chave_anon_ou_service
```

Configure o cliente Supabase:

```python
# app/database.py
from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)
```

---

## 2. Operações Principais do Supabase

### Autenticação

#### Registrar

```python
supabase.auth.sign_up({
    "email": "user@example.com",
    "password": "123456"
})
```

#### Login

```python
supabase.auth.sign_in_with_password({
    "email": "user@example.com",
    "password": "123456"
})
```

### CRUD Básico

#### Inserir

```python
supabase.table("profiles").insert({
    "name": "John"
}).execute()
```

#### Buscar tudo

```python
supabase.table("profiles").select("*").execute()
```

#### Buscar filtrando

```python
supabase.table("profiles").select("*").eq("id", 1).execute()
```

#### Atualizar

```python
supabase.table("profiles").update({
    "name": "Novo Nome"
}).eq("id", 1).execute()
```

#### Deletar

```python
supabase.table("profiles").delete().eq("id", 1).execute()
```

---

## 3. Rodando o Backend FastAPI

Execute:

```bash
uvicorn app.main:app --reload
```

Backend disponível em:

```txt
http://127.0.0.1:8000
```

Documentação automática:

```txt
http://127.0.0.1:8000/docs
```

---

## 4. Repositórios – Onde Ficam as Queries

```python
from app.database import supabase

class AuthRepository:
    @staticmethod
    def create(data: dict):
        return supabase.table("users").insert(data).execute()

    @staticmethod
    def find_by_email(email: str):
        return supabase.table("users").select("*").eq("email", email).single().execute()
```

---

## 5. Serviços – Onde Ficam as Regras

```python
from app.repositories.auth_repository import AuthRepository

class AuthService:
    @staticmethod
    def register(user):
        existing = AuthRepository.find_by_email(user.email)
        if existing.data:
            raise Exception("Usuário já existe")

        return AuthRepository.create(user.dict())
```

---

## 6. Boas Práticas Simples

- Rotas recebem e devolvem dados.
- Serviços fazem regras.
- Repositórios fazem queries.
- Nunca exponha chaves sensíveis.
- Sempre use `.env`.

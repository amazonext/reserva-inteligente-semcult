# Guia de Modelo de Banco de Dados no Supabase

Este documento estabelece como **o modelo atual do banco (fornecido)** está estruturado e como **ele deve ser estruturado** para ser utilizado pelo aplicativo do projeto. O objetivo é que qualquer desenvolvedor consiga criar ou manter o banco no Supabase seguindo exatamente o padrão adotado.

---

## 1. Visão Geral

O app depende de um banco com suporte a:

* Eventos em tempo real
* Registro de mensagens
* Controle de assinaturas (subscriptions) do canal
* Migrações estruturadas

O Supabase já fornece parte dessa estrutura via o schema `realtime`. Este documento consolida como ela deve existir dentro do projeto.

---

## 2. Modelo Atual (como veio do Supabase)

Abaixo está o modelo original apenas para referência, **não deve ser executado diretamente**:

* Tabela `realtime.messages`
* Tabela `realtime.schema_migrations`
* Tabela `realtime.subscription`

O modelo inclui chaves compostas, tipos específicos (`regrole`, `regclass`), arrays de filtros e payloads em `jsonb`.

---

## 3. Modelo Recomendado (como deve ser no projeto)

Abaixo está a versão padronizada que deve ser reproduzida no Supabase ao configurar o banco para o app.

### 3.1 Tabela `realtime.messages`

* Armazena mensagens emitidas via canais realtime.
* Deve conter:

  * `id` (uuid, PK)
  * `topic` (text)
  * `extension` (text)
  * `payload` (jsonb)
  * `event` (text)
  * `private` (boolean, default false)
  * `inserted_at` (timestamp, default now())
  * `updated_at` (timestamp, default now())
* PK combinada: `(id, inserted_at)`

### 3.2 Tabela `realtime.schema_migrations`

* Controle interno de migrações.
* Deve conter:

  * `version` (bigint, PK)
  * `inserted_at` (timestamp)

### 3.3 Tabela `realtime.subscription`

* Gerencia as assinaturas dos canais realtime.
* Deve conter:

  * `id` (identity, PK)
  * `subscription_id` (uuid)
  * `entity` (regclass)
  * `filters` (array de `realtime.user_defined_filter[]`)
  * `claims` (jsonb)
  * `claims_role` (regrole, default calculado)
  * `created_at` (timestamp UTC default now())

---

## 4. Como o App Deve Conectar ao Banco

Para que outros desenvolvedores consigam integrar o app com o Supabase, o banco deve estar configurado com:

* URL do projeto
* Chave pública (anon key) configurada no app
* Chave de serviço usada apenas no backend (se aplicável)
* Schema `realtime` habilitado com permissões padrão

### Configurações obrigatórias para o projeto

1. Ativar Realtime nas tabelas necessárias.
2. Garantir que o schema `realtime` permanece **não modificado além do recomendado aqui**.
3. Configurar políticas de acesso (RLS) conforme o fluxo do app.

---

## 5. Processo para Criar o Banco Igual no Supabase

1. Criar um novo projeto no Supabase.
2. Acessar a aba SQL.
3. Na sessão de schemas, confirmar que o schema `realtime` existe.
4. Conferir se as tabelas descritas acima já foram criadas automaticamente.
5. Se necessário, ajustar apenas colunas divergentes (sem alterar estrutura base do Supabase).
6. Habilitar Realtime.
7. Inserir as chaves no app:

   * `SUPABASE_URL`
   * `SUPABASE_ANON_KEY`

---

## 6. Observações Finais

* Este documento deve ser seguido por qualquer desenvolvedor que for replicar ou dar manutenção no banco do projeto.
* Não modificar tipos internos (`regrole`, `regclass`) sem alinhamento com a arquitetura.
* O schema `realtime` não deve ser recriado manualmente; apenas validado.

---

Caso o projeto evolua e novas tabelas próprias do app sejam adicionadas, estas devem ser documentadas em um arquivo separado chamado **modelo_app_db.md** para evitar confusão com o schema interno `realtime`.

Segue um bloco de código SQL alinhado ao modelo esperado no Supabase. Ele **não deve ser executado diretamente** caso já exista o schema `realtime`, mas serve como referência técnica para desenvolvedores criarem ou validarem a estrutura:

```sql
-- MODELO REFERENCIAL DO BANCO (NÃO EXECUTAR SEM NECESSIDADE)

-- Tabela: realtime.messages
CREATE TABLE realtime.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text NOT NULL,
  extension text NOT NULL,
  payload jsonb,
  event text,
  private boolean DEFAULT false,
  inserted_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

-- Tabela: realtime.schema_migrations
CREATE TABLE realtime.schema_migrations (
  version bigint PRIMARY KEY,
  inserted_at timestamp
);

-- Tabela: realtime.subscription
CREATE TABLE realtime.subscription (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  subscription_id uuid NOT NULL,
  entity regclass NOT NULL,
  filters realtime.user_defined_filter[] DEFAULT '{}',
  claims jsonb NOT NULL,
  claims_role regrole DEFAULT realtime.to_regrole((claims->>'role')),
  created_at timestamp NOT NULL DEFAULT timezone('utc', now())
);
```

  

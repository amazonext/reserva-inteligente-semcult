<h1 align="center">🎯 Sistema de Reservas Inteligente – SEMCULT</h1>
<p align="center">
  <b>Projeto Acadêmico + Aplicação Real com Python, FastAPI, PostgreSQL, Cloud, IoT e Indústria 4.0</b><br>
  <i>Desenvolvido por alunos da Faculdade Estácio – Nazaré, em parceria com a Secretaria Municipal de Cultura e Turismo de Belém</i>
</p>

---

## 📌 Sobre o Projeto

Sistema web para controle e gerenciamento de reservas de espaços culturais da SEMCULT.  
A solução será desenvolvida **fora da infraestrutura institucional** (por segurança e autonomia) e, ao final, será preparada para implantação oficial em servidor Ubuntu.

---

## 🎯 Objetivos

- ✅ Digitalizar e centralizar a gestão de reservas da SEMCULT
- ✅ Aplicar conceitos de Cloud, IoT e Indústria 4.0 com Python
- ✅ Consolidar aprendizado técnico e criar uma solução real de impacto

---

## 🧰 Tecnologias Utilizadas

| Categoria       | Ferramenta                              |
|-----------------|------------------------------------------|
| 🔙 Backend      | Python 3.10+, FastAPI                    |
| 🗃 Banco de Dados| PostgreSQL                              |
| 🎨 Frontend     | HTML5, CSS3, JavaScript (HTMX / Alpine) |
| 🌐 Deploy       | Nginx + Gunicorn (pós-projeto)           |
| ⚙️ Infra Dev    | Git, GitHub, Virtualenv                  |
| 📦 Containers   | Docker (opcional, para quem quiser)      |

---

## 🧩 Funcionalidades

- 👥 Login com autenticação e perfis (usuário, gestor, admin)
- 📝 Formulário para solicitação de reserva
- ✅ Aprovação ou reprovação por gestor
- 📅 Visualização da agenda (diária, semanal, mensal)
- ✏️ Cancelamento e edição controlada
- 📊 Relatórios por período, espaço e status
- 📧 Notificações por e-mail institucional (fase final)

---

## 📂 Estrutura Recomendada

```bash
reserva-inteligente-semcult/
├── backend/
│   └── app/
│       ├── main.py
│       ├── routes/
│       ├── models/
│       ├── schemas/
│       └── services/
├── frontend/
│   ├── templates/
│   ├── static/
│   └── index.html
├── database/
│   └── init.sql
├── .env.example
├── docker-compose.yaml
├── requirements.txt
├── README.md
└── docs/
    ├── Diagnostico_Teorizacao.pdf
    ├── Plano_Execucao.pdf
    └── ROTEIRO_DE_EXTENSAO.pdf

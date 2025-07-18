# Barbearia Digital

Sistema de gestão de barbearia - Projeto final da disciplina Desenvolvimento Web

---

## 🚀 Visão Geral

O Barbearia Santos é um sistema web pensado para facilitar o dia a dia de barbearias modernas, oferecendo:

- **Agendamento online** (wizard intuitivo de agendamento)
- **Gestão de barbeiros e equipe**
- **Painel administrativo**
- **Experiência amigável de agendamento e avaliação**

---

## Equipe:
- Alysson Gabriel
- Matheus Victor
- Rian Rodrigues

## 🧩 Tecnologias

- **Frontend:** React + NextJS, TailwindCSS, Shadcn
- **Backend:** Java Spring Boot (REST API)
- **Banco de Dados:** MySQL (utf8mb4, unicode_ci)

---

## 📦 Estrutura do Projeto

```
/
├─ frontend/            # Aplicação React (interface web)
├─ backend/             # API Java Spring Boot
├─ docs/                # Documentação, wireframes, ER diagramas
└─ README.md
```

---

## ✨ Funcionalidades Principais

### 1. Agendamento Online
- Wizard passo a passo: **Barbeiro → Serviço → Data → Horário → Confirmação**
- Só horários livres aparecem
- Histórico de agendamentos para o cliente

### 2. Gestão de Equipe
- Dono pode adicionar, editar, ativar/desativar barbeiros e serviços
- Cada barbeiro visualiza sua agenda pessoal

## 3. Sistema de avaliação
- Clientes podem avaliar serviço

---

## 🔧 Instalação & Run

### 1. Banco de Dados

Crie o banco importando o arquivo .sql do projeto

```sql
db_barbearia
```

### 2. Backend (Spring Boot)

```bash
cd backend
# Configure o application.properties com os dados do banco
./mvnw spring-boot:run

# (IntelliJ)
# caso o lombok dê conflito, baixar e adicionar em project's structure (lib)
# File > Settings > Build, Execution, Deployment > Compiler > Annotation Processors

    Marque a opção:

    ☑ Enable annotation processing

    Na opção:

    "Store generated sources relative to", escolha:

    Module content root e Escolha o arquivo lombok baixado

!Importante:
# criar arquivo application-dev.properties com usuario e senha do banco, além da chave jwt
```

### 3. Frontend (Next)

```bash
cd frontend
npm install
npm run dev

criar arquivo .env.local
adicionar: NEXT_PUBLIC_API_URL=http://localhost:{PORTA_DO_BACKEND}
```
---

## 💡 Dicas de Uso

- Funcionários podem registrar vendas para clientes não cadastrados (“venda balcão”)
- Controle de estoque é automático em toda venda/pedido
- Sistema preparado para clientes digitais e público presencial
- Home page foca em agendamento, mas destaca todos os serviços

---

## 📄 Licença

MIT

---

## 📣 Contato & Contribuição

Dúvidas, sugestões ou quer contribuir?  
Abra uma Issue ou Pull Request!

---

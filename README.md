# Barbearia Digital

Sistema completo para gestão de barbearia, incluindo agendamento online, planos de assinatura, controle de equipe e experiência do cliente. Feito para atender tanto clientes digitais quanto o público presencial.

---

## 🚀 Visão Geral

O Barbearia Santos é um sistema web pensado para facilitar o dia a dia de barbearias modernas, oferecendo:

- **Agendamento online** (wizard intuitivo, horários livres em tempo real)
- **Gestão de barbeiros e equipe**
<!-- - **Loja de produtos** (consumo local ou retirada) -->
- **Planos mensais** (assinatura de cortes)
<!-- - **Controle de estoque e pedidos** -->
<!-- - **Fluxo presencial** (venda para clientes avulsos sem cadastro) -->
- **Painel administrativo completo**
<!-- - **Gestão financeira e relatórios** -->
- **Experiência amigável para qualquer público**

---

## 🧩 Tecnologias

- **Frontend:** React + NextJS, TailwindCSS, Shadcn
- **Backend:** Java Spring Boot (REST API)
- **Banco de Dados:** MySQL (utf8mb4, unicode_ci)
- **Hospedagem sugerida:** Render, Railway, Netlify/Vercel, DigitalOcean, AWS

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
- Wizard passo a passo: **Barbeiro → Serviço → Horário → Pagamento → Confirmação**
- Só horários livres aparecem, confirmação automática por email/mensagem
- Histórico de agendamentos para o cliente

### 2. Gestão de Equipe
- Dono pode adicionar, editar, ativar/desativar barbeiros
- Cada barbeiro visualiza sua agenda pessoal

<!-- ### 3. Loja de Produtos
- Venda de produtos para consumo local ou retirada
- Controle de estoque automático
- Pedidos podem ser feitos por clientes cadastrados ou presencialmente na barbearia -->

### 3. Planos Mensais
- Assinatura de pacotes de cortes e serviços
- Controle de uso dos créditos

<!-- ### 5. Controle Financeiro
- Relatórios de faturamento, comissão de barbeiros, controle de despesas -->

<!-- ### 6. Fluxo Presencial (Venda rápida)
- Funcionário registra venda para cliente avulso (sem cadastro)
- Estoque e pedidos são atualizados normalmente -->

---

## 🎨 Telas e Experiência do Usuário

- **Home:** Destaque para agendamento, serviços, loja, planos e equipe
- **Wizard de Agendamento:** Fluxo guiado, amigável e responsivo
<!-- - **Produtos em Destaque:** Loja integrada à experiência do cliente -->
- **Área do Cliente:** Histórico, plano, pedidos, feedback
- **Painel Admin:** Gestão de equipe, produtos, estoque, relatórios
- **Suporte a clientes não cadastrados (venda balcão)**

---

## 🗃️ Modelagem de Dados (ER)

- Usuário (roles: CLIENTE, BARBEIRO, DONO)
- Barbeiro
- Cliente
- Serviço
- Produto
- Plano
- Assinatura
- Agendamento (Booking)
- Pedido (Order)
- Itens do Pedido (OrderItem)
- Feedback
- Transação (controle financeiro)

<!-- *Veja o diagrama completo em* `/docs/er-diagram.mmd` -->

---

## 🔧 Instalação & Deploy

### 1. Banco de Dados

Crie o banco com:

```sql
CREATE DATABASE barbearia
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

### 2. Backend (Spring Boot)

```bash
cd backend
# Configure o application.properties com os dados do banco
./mvnw spring-boot:run
```

### 3. Frontend (React)

```bash
cd frontend
npm install
npm run build
# Para desenvolvimento:
npm start
```

### 4. Deploy

- **Frontend:** Vercel, Netlify, S3 ou hospedagem estática
- **Backend:** Render, Railway, VPS (DigitalOcean, etc)
- **MySQL:** Render, Railway, RDS (AWS), ou VPS

**Custo inicial estimado:** A partir de US$ 10-15/mês para produção básica

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

### Exemplo de Frases e CTAs para Home

- "Transforme seu visual. Agende seu corte com quem entende de estilo!"
- "Agende online, venha presencialmente, saia renovado."
- "Produtos exclusivos para cuidar do seu visual."

---
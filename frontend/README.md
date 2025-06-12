# Desenvolvimento do Frontend - Barbearia Santos


> Documento guia para a estrutura do projeto.

## 📋 Índice

- [Primeiros Passos](#-primeiros-passos)
- [Scripts Essenciais](#-scripts-essenciais)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Estrutura de Código e Convenções](#-estrutura-de-código-e-convenções)
- [Padrões e Ferramentas de Código](#-padrões-e-ferramentas-de-código)
- [Gerenciamento de Estado](#-gerenciamento-de-estado)
- [Decisões de Arquitetura](#-decisões-de-arquitetura)

---

## 🚀 Primeiros Passos

Siga estes passos para configurar seu ambiente de desenvolvimento local.

1.  **Pré-requisitos:**
    - [Node.js](https://nodejs.org/en/) (usamos a versão `v18.x`, gerencie com [nvm](https://github.com/nvm-sh/nvm) se possível).
    - [Yarn](https://yarnpkg.com/getting-started/install) (usamos Yarn como gerenciador de pacotes padrão).

2.  **Instalação:**

    ```bash
    # Clonar o repositório
    $ git clone https://github.com/alyssongab/barbershop.git
    
    # Entrar na pasta
    $ cd barbershop/
    
    # Instalar as dependências
    $ npm install
    ```

3.  **Configuração do Ambiente:**

    ```bash
    # Criar seu arquivo de ambiente local a partir do exemplo
    $ cp .env.example .env.local
    ```
    - Agora, abra o `.env.local` e preencha as variáveis.

4.  **Rodando a Aplicação:**
    ```bash
    $ npm run dev
    ```
    - A aplicação estará disponível em `http://localhost:3000`.

## 🛠️ Scripts

- `npm run dev`: Inicia o servidor de desenvolvimento com Hot Reload.
- `npm run build`: Compila e otimiza a aplicação para produção na pasta `dist/`.

## 🔑 Variáveis de Ambiente

O arquivo `.env.local` é **obrigatório** para o funcionamento do projeto. Ele não é versionado.

| Variável            | Descrição                                         | Exemplo                                | Onde Obter?                                |
| ------------------- | ------------------------------------------------- | -------------------------------------- | ------------------------------------------ |
| `API_URL`      | URL base da API de backend para o ambiente de dev. | `http://localhost:3333/api`            | Fornecido pelo time |

## 📂 Estrutura de Código e Convenções

A estrutura de pastas visa a escalabilidade e a separação de responsabilidades. **Siga rigorosamente esta organização.**

```
/src
├── assets/             # SVGs, imagens, fontes
├── components/         # Componentes de UI puros e reutilizáveis
│   ├── common/         # Átomos: Button, Input, Spinner, etc.
│   └── layout/         # Estrutura: Header, Sidebar, PageWrapper, etc.
├── features/           # Módulos de funcionalidade (ex: 'auth', 'products')
│   └── products/
│       ├── api/        # Hooks e funções para chamadas da API de produtos
│       ├── components/ # Componentes específicos da feature de produtos
│       └── hooks/      # Hooks específicos da feature
├── hooks/              # Hooks globais e reutilizáveis (ex: useLocalStorage)
├── lib/                # Instâncias e configurações de bibliotecas (axios, queryClient)
├── pages/              # Componentes que representam rotas/páginas
├── services/           # Lógica de negócio desacoplada (raramente usado)
├── store/              # Gerenciamento de estado global (Zustand, Redux)
│   ├── slices/         # As "fatias" do nosso estado
│   └── index.ts        # Exportação principal do store
├── styles/             # Estilos globais, temas, reset CSS
└── utils/              # Funções utilitárias puras (formatDate, currencyMask)
```

**Regras de Ouro:**
1.  **`components/` vs `features/**/components/`**: Se um componente é genérico e não tem lógica de negócio (ex: `<Button>`), ele vive em `components/common`. Se ele é específico de uma funcionalidade (ex: `<ProductCard>`), ele vive dentro da sua respectiva pasta em `features/`.
2.  **Lógica de API**: Toda a lógica de requisição (React Query, RTK Query, Axios) deve ser centralizada, preferencialmente dentro da `feature` a que pertence.
3.  **Não coloque lógica de negócio em `pages/`**: Páginas devem apenas compor componentes e orquestrar o layout.

## ✨ Padrões e Ferramentas de Código

- **Linter:** Usamos [ESLint](https://eslint.org/) com uma configuração baseada no `eslint-config-airbnb`. Para verificar, rode `yarn lint`.
- **Formatter:** Usamos [Prettier](https://prettier.io/) para garantir um estilo de código consistente. Configure seu editor para formatar ao salvar (`formatOnSave`).
- **Convenções de Nomenclatura:**
    - **Componentes:** `PascalCase` (ex: `MyComponent.tsx`).
    - **Arquivos não-componentes:** `camelCase` (ex: `apiClient.ts`).
    - **Testes:** `*.test.ts` ou `*.spec.ts`.

## 🧠 Gerenciamento de Estado

- **Biblioteca:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Por quê?** Escolhemos Zustand pela sua simplicidade, API mínima e por evitar o boilerplate excessivo do Redux.
- **Como usar?** Crie um novo "slice" (store) dentro de `src/store/slices/`. Importe e use o hook gerado diretamente nos componentes que precisam daquele estado. Evite colocar todo o estado em um único store monolítico.

## ⚖️ Decisões de Arquitetura

- **Build Tool:** Usamos [Vite](https://vitejs.dev/) em vez de Webpack por sua velocidade superior no desenvolvimento local (HMR) e configuração mais simples.
- **CSS:** Usamos [Styled Components](https://styled-components.com/) para componentização de estilos e escopo automático, evitando conflitos de CSS.
- **Requisições HTTP:** Utilizamos o `axios` com interceptors (em `src/lib/axios.ts`) para injetar automaticamente tokens de autenticação e tratar erros de forma centralizada.

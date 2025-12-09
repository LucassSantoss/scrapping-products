# scrapping-products

# Tutorial de Instalação 
## Pré-requisitos
Antes de começar, certifique-se de ter instalado:
- **Node.js**
- **npm**
- **Git**

## Clonar o Repositório
Abra o terminal e execute:
```bash
git clone https://github.com/LucassSantoss/scrapping-products.git
cd scrapping-products
```

## Instalar Dependências do Frontend
No diretório raiz do projeto, instale as dependências do React:
```bash
npm install
```

## Instalar Dependências do Backend
Navegue até a pasta do servidor e instale as dependências:
```bash
cd server
npm install
```

Volte para o diretório raiz:
```bash
cd ..
```

## Configurar Variáveis de Ambiente

### Obter a API Key do SerpAPI
1. Acesse [https://serpapi.com/](https://serpapi.com/)
2. Crie uma conta gratuita
3. No dashboard, copie sua API key

### Criar arquivo .env
Na pasta `server`, crie o arquivo `.env` baseado no exemplo (.env.example)

# Executar a Aplicação
**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
Abra um novo terminal na pasta raiz do projeto e execute:
```bash
npm run dev
```

## Acessar a Aplicação
Abra seu navegador e acesse:
```
http://localhost:5173
```

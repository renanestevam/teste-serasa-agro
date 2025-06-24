# Serasa Agro - Sistema de Gestão de Produtores Rurais

Uma aplicação full-stack para gerenciar produtores rurais e suas propriedades, construída com frontend React + TypeScript e backend NestJS + PostgreSQL.

## Funcionalidades

- **Gestão de Produtores**: Operações CRUD para produtores rurais com validação de CPF/CNPJ
- **Gestão de Propriedades**: Gerenciar propriedades rurais com validação de área
- **Acompanhamento de Safras e Culturas**: Rastrear safras e culturas plantadas por propriedade
- **Dashboard**: Análises visuais com gráficos mostrando:
  - Total de fazendas e hectares
  - Distribuição de fazendas por estado
  - Distribuição de tipos de cultura
  - Uso da terra (cultivável vs vegetação)

## Tecnologias Utilizadas

### Backend
- NestJS com TypeScript
- PostgreSQL com TypeORM
- Class Validator para validação de dados
- Documentação Swagger/OpenAPI
- Jest para testes

### Frontend
- React 18 com TypeScript
- Redux Toolkit para gerenciamento de estado
- Styled Components para estilização
- Recharts para visualização de dados
- React Hook Form com validação Yup
- Padrão Atomic Design
- Jest + React Testing Library para testes

## Como Começar

### Pré-requisitos
- Docker e Docker Compose
- Node.js 18+ (para desenvolvimento local)

### Executando com Docker

1. Clone o repositório
2. Execute a aplicação:

```bash
docker compose up --build
```

Isso irá iniciar:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Documentação da API: http://localhost:3000/api
- PostgreSQL: localhost:5432

**Nota**: O banco de dados será automaticamente populado com dados de exemplo na primeira execução para demonstrar a funcionalidade do dashboard.

### Desenvolvimento Local

#### Configuração do Backend
```bash
cd backend
npm install
npm run start:dev
```

#### Configuração do Frontend
```bash
cd frontend
npm install
npm run dev
```

## Documentação da API

Com o backend em execução, acesse a documentação Swagger em:
http://localhost:3000/api

## Testes

### Testes do Backend
```bash
cd backend
npm run test          # Testes unitários
npm run test:e2e      # Testes de integração
npm run test:cov      # Relatório de cobertura
```

### Testes do Frontend
```bash
cd frontend
npm run test
```

## Esquema do Banco de Dados

A aplicação utiliza um esquema PostgreSQL normalizado com as seguintes entidades:

- **Produtores**: CPF/CNPJ, nome
- **Propriedades**: Detalhes da fazenda, localização, áreas
- **Safras**: Ano, temporada por propriedade
- **Culturas**: Tipo de cultura, área plantada por safra

## Regras de Validação

- Validação de CPF/CNPJ usando algoritmos oficiais
- Validação de área: cultivável + vegetação ≤ área total
- Todos os campos obrigatórios validados tanto no frontend quanto no backend

## Arquitetura

### Backend
- Arquitetura modular com módulos separados para cada entidade
- Camada de serviço para lógica de negócio
- Padrão Repository com TypeORM
- Classes DTO para contratos da API
- Validadores customizados para regras de negócio

### Frontend
- Padrão Atomic Design
- Redux para gerenciamento de estado global
- Hooks customizados para chamadas de API
- Design responsivo com styled-components
- Validação de formulários com feedback em tempo real

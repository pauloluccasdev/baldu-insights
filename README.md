# Baldú Insights

Plataforma SaaS para assessorias de esportes de endurance. Interface de consulta em linguagem natural sobre atletas, treinos, comentários e provas — integrada ao TrainingPeaks.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Next.js 15 (App Router) + TypeScript |
| Backend | NestJS 10 + TypeScript |
| Banco de dados | PostgreSQL + Prisma ORM |
| Autenticação | JWT (dois estágios: login → seleção de perfil) |
| Monorepo | npm workspaces |

## Estrutura

```
baldu/
├── apps/
│   ├── api/                  # NestJS — porta 3001
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── seed.ts
│   │   └── src/
│   │       ├── auth/         # Login + seleção de perfil
│   │       ├── dashboard/    # Dados do painel por perfil
│   │       ├── profiles/     # Listagem de perfis
│   │       └── prisma/       # PrismaService (global)
│   └── web/                  # Next.js — porta 3002
│       ├── app/
│       │   ├── login/
│       │   ├── profiles/
│       │   └── dashboard/
│       ├── components/
│       │   ├── login/
│       │   ├── profiles/
│       │   └── dashboard/
│       └── lib/
│           └── api.ts        # Client HTTP para a API
└── packages/
    └── types/                # Tipos compartilhados
```

## Pré-requisitos

- Node.js 20+
- Docker (para o PostgreSQL)

## Configuração inicial

### 1. Clone o repositório

```bash
git clone https://github.com/pauloluccasdev/baldu-insights.git
cd baldu-insights
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie `apps/api/.env` a partir do exemplo:

```bash
cp .env.example apps/api/.env
```

Edite `apps/api/.env` com suas credenciais:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/baldu"
JWT_SECRET="seu-segredo-aqui"
WEB_URL="http://localhost:3002"
```

Crie `apps/web/.env.local`:

```bash
echo 'NEXT_PUBLIC_API_URL="http://localhost:3001/api"' > apps/web/.env.local
```

### 4. Suba o banco de dados com Docker

```bash
docker run -d --name baldu-pg \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=baldu \
  -p 5432:5432 postgres:16
```

### 5. Aplique o schema e popule o banco

```bash
# Sincroniza o schema do Prisma com o banco
cd apps/api && npx prisma db push && cd ../..

# Popula com 1 conta e 3 perfis de exemplo
npm run seed -w @baldu/api
```

### 6. Gere o Prisma Client

```bash
npm run prisma:generate -w @baldu/api
```

### 7. Rode o projeto

```bash
# Roda API (3001) e frontend (3002) simultaneamente
npm run dev
```

Acesse: **http://localhost:3002**

## Endpoints da API

```
POST /api/auth/login            # { email, password } → { accessToken }
POST /api/auth/select-profile   # { profileKey } → { accessToken, profileKey }
GET  /api/profiles              # Lista perfis disponíveis
GET  /api/dashboard             # Dados do dashboard (requer perfil selecionado)
```

## Modelo de autenticação

O fluxo JWT é de dois estágios:

1. **Login** → token com `profileKey: "none"` — permite listar perfis
2. **Selecionar perfil** → novo token com `profileKey` real — libera o dashboard

Isso reflete o fluxo da UI: login → tela de seleção de perfil → dashboard filtrado pelo workspace do treinador.

## Banco de dados

```prisma
Account   # Credenciais de acesso (email + senha bcrypt)
Profile   # Perfil de cada treinador — dados JSON para MVP
Folder    # Pastas de atletas vinculadas a um perfil
```

Os dados de atletas, comentários, provas e gráficos são armazenados como JSON no modelo `Profile` — abordagem pragmática para o MVP antes da integração real com o TrainingPeaks.

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Roda API + frontend em modo watch |
| `npm run build` | Build de produção dos dois apps |
| `npm run seed -w @baldu/api` | Popula o banco com dados de exemplo |
| `npm run prisma:generate -w @baldu/api` | Gera o Prisma Client |

# Canvas — Collaborative Drawing App

Real-time collaborative whiteboard with AI diagram generation. Draw, sketch, and brainstorm together.

## Architecture

Turborepo monorepo with pnpm workspaces.

```
apps/
  web/          Next.js 16 frontend (React 19, Canvas API, roughjs)
  server/       Express 5 + WebSocket backend (ws, argon2, JWT)
packages/
  db/           Prisma ORM + PostgreSQL
  jwt/          Shared JWT config
  types/        Shared Zod schemas + TypeScript types
```

## Features

- **Guest canvas** — draw locally without signup (`/canvas`)
- **Collaborative rooms** — real-time multi-user drawing via WebSocket (`/room/:slug`)
- **AI diagrams** — generate diagrams/flowcharts via Anthropic Claude
- **Live cursors** — see collaborators' cursors in real-time
- **Room chat** — persistent chat per room with history on rejoin
- **Drawing tools** — rectangle, diamond, ellipse, line, arrow, pencil, text, eraser
- **Style controls** — stroke color, fill, width, roughness, opacity, font
- **Undo/redo** — full history stack
- **Dark mode** — toggle per session
- **Export** — download canvas as PNG

## Quick Start

```bash
# Prerequisites: Node >= 18, pnpm 9, Docker (for PostgreSQL)

# 1. Start PostgreSQL
docker compose up -d

# 2. Install deps
pnpm install

# 3. Set up environment
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env
cp packages/db/.env.example packages/db/.env

# 4. Generate Prisma client + run migrations
pnpm --filter @repo/db exec prisma generate
pnpm --filter @repo/db exec prisma migrate deploy

# 5. Run dev
pnpm dev
```

Web: http://localhost:3000 | Server: http://localhost:3002

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/signup` | — | Create account |
| POST | `/signin` | — | Login, returns JWT |
| GET | `/me` | JWT | Current user info |
| POST | `/room` | JWT | Create room |
| GET | `/rooms` | JWT | List user's rooms |
| GET | `/room/:slug` | JWT | Room details |
| DELETE | `/room/:slug` | JWT | Delete room (admin only) |

## WebSocket Messages

Connect: `ws://host:3002?token=JWT`

| Type | Direction | Description |
|------|-----------|-------------|
| `join_room` | client→server | Join with `{ roomId }` |
| `init_room` | server→client | Elements + chat history |
| `draw` | bidirectional | Committed element |
| `draw_live` | bidirectional | In-progress drawing (60fps cap) |
| `erase` | bidirectional | Delete elements by ID |
| `cursor` | bidirectional | Cursor position |
| `clear` | bidirectional | Clear all elements |
| `chat` | bidirectional | Chat message |
| `user_joined` | server→client | User entered room |
| `user_left` | server→client | User left room |

## Deployment

- **Frontend** → Vercel (auto-deploy on push via GitHub Actions)
- **Backend** → Hetzner via SSH + PM2 (`ecosystem.config.cjs`), nginx reverse proxy (`infra/nginx.conf`)
- **Database** → PostgreSQL (external)
- **CI** → GitHub Actions: type-check + lint on push/PR

## Environment Variables

### Server (`apps/server/.env`)
- `DATABASE_URL` — PostgreSQL connection string
- `PORT` — Server port (default: 3002)
- `JWT_SECRET` — JWT signing secret
- `FRONTEND_URL` — CORS origin (default: http://localhost:3000)

### Web (`apps/web/.env`)
- `NEXT_PUBLIC_API_URL` — Backend API URL
- `NEXT_PUBLIC_WS_URL` — WebSocket URL
- `JWT_SECRET` — For AI route auth verification
- `ANTHROPIC_API_KEY` — Optional server-side AI key

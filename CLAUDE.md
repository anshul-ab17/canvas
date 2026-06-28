# CLAUDE.md

## Project: Canvas — Collaborative Drawing App

Turborepo monorepo. pnpm 9. Node >= 18.

## Commands

```bash
pnpm dev              # Run all apps in dev mode
pnpm build            # Build all packages + apps
pnpm lint             # ESLint across workspace
pnpm check-types      # TypeScript type checking

# Database
pnpm --filter @repo/db exec prisma generate    # Generate Prisma client
pnpm --filter @repo/db exec prisma migrate deploy  # Apply migrations
pnpm --filter @repo/db exec prisma migrate dev     # Create new migration (dev)

# Individual apps
pnpm --filter web dev          # Next.js on :3000
pnpm --filter server dev       # Express+WS on :3002
```

## Structure

- `apps/web/` — Next.js 16 (React 19). Canvas rendering via HTML5 Canvas + roughjs. Pages: `/` (hero), `/signin`, `/dashboard`, `/canvas` (guest), `/room/[slug]` (collab).
- `apps/server/` — Express 5 + native `ws` WebSocket. Auth (argon2 + JWT), REST API, real-time socket for drawing/chat/cursors.
- `packages/db/` — Prisma with PostgreSQL (PrismaPg adapter). Models: User, Room, Chat, Element.
- `packages/jwt/` — Shared JWT_SECRET config.
- `packages/types/` — Zod schemas for API + WebSocket validation, shared TypeScript types.

## Key Patterns

- WebSocket messages validated with Zod schemas from `@repo/types`
- In-memory element cache (`roomCache`) with periodic DB flush every 150ms + exponential retry
- Elements soft-deleted (`isDeleted: true`), not hard-deleted
- JWT passed as `authorization` header (no Bearer prefix) for REST, as `?token=` query param for WS
- Frontend uses `localStorage` for token, theme, API key storage
- Room chat persisted to DB, loaded on join via `init_room` message
- Canvas uses requestAnimationFrame render loop with roughjs for sketch style

## Conventions

- ESM throughout (`"type": "module"`)
- Imports use `.js` extension for local modules in server
- No test framework configured yet
- Commit messages: short imperative phrases

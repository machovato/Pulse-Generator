# DTN Project Pulse

A meeting presentation engine built on Next.js 14 (App Router) + TypeScript. JSON-driven, immutable record store, premium animated slide renderer.

## Architecture

| Layer | Technology |
|---|---|
| Framework | Next.js 14 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS custom properties |
| Animations | Framer Motion |
| Database | PostgreSQL (Railway) / SQLite (local dev) |
| ORM | Prisma |
| Validation | Zod discriminated union |
| Editor | Monaco Editor |
| Icons | Lucide React |

## Routes

| Route | Description |
|---|---|
| `/editor` | JSON paste editor with validation, repair, and publish |
| `/history` | All saved decks newest-first |
| `/deck/[id]` | Presentation mode (public, no auth) |
| `/schema` | Live JSON schema documentation |

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string (Railway) or `file:./dev.db` (SQLite) |
| `DB_PROVIDER` | Yes | `postgresql` or `sqlite` |
| `NEXT_PUBLIC_APP_URL` | Yes | App URL (e.g. `https://your-app.railway.app`) |
| `ADMIN_SECRET` | No | If set, protects `/editor` and `/history` with a secret key |

## Local Development

### Prerequisites
- Node.js 18+
- npm

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env template
cp .env.example .env
# Edit .env — default uses SQLite for local dev (no Railway needed)

# 3. Generate Prisma client
npm run db:generate

# 4. Push schema to local SQLite
npm run db:push

# 5. Seed with example decks
npm run db:seed

# 6. Start dev server
npm run dev
```

Visit `http://localhost:3000` → opens at `/history` with 2 seed decks ready.

## Railway Deployment

### 1. Create a Railway project
- New project → **Deploy from GitHub repo**
- Connect this repository
- Railway will auto-detect Next.js and configure the build

### 2. Add PostgreSQL
- In your Railway project: **+ New** → **Database** → **PostgreSQL**
- Railway automatically sets `DATABASE_URL` in the project environment

### 3. Set environment variables
In Railway project settings → Variables:
```
DB_PROVIDER=postgresql
NEXT_PUBLIC_APP_URL=https://your-app.railway.app
ADMIN_SECRET=your-strong-secret-here
```

> **Note:** `DATABASE_URL` is set automatically by Railway when you add the PostgreSQL plugin.

### 4. Run migrations on deploy
Add a **Deploy Command** in Railway settings:
```
npx prisma migrate deploy && npx prisma db seed && npm start
```

Or use separate Railway services for migrations.

### 5. Git push to deploy
```bash
git push origin main
```
Railway auto-deploys on every push to `main`.

## Keyboard Shortcuts (Presentation Mode)

| Key | Action |
|---|---|
| `←` / `→` or `↑` / `↓` | Navigate slides |
| `N` | Toggle speaker notes overlay |
| `G` | Toggle slide grid overview (click thumbnail to jump) |
| `D` | Toggle density mode (Full ↔ Executive) |
| `P` | Print / export to PDF |
| `E` | Return to Editor |
| `Esc` | Dismiss overlay (notes or grid) |

## JSON Schema

See `/schema` in the app for the live contract. Key rules:
- `schemaVersion` must be `1`
- `slides[].type` must be one of: `hero`, `kpis`, `pipeline`, `grid`, `timeline`, `blockers`, `callout`, `agenda`, `decision_log`
- `slides[].data` shape is determined by `type` (discriminated union)
- Arrays >4 items auto-paginate (blockers cap at 6)
- Executive density mode shows max 3 items per slide globally

### Schema v2 Roadmap
- `grid` slides will gain an optional `subtitle` field for a one-line section description in the left panel (deferred from v1 — no schema change required for existing decks)

## Database Notes

- Every publish creates a **new immutable record** — no overwrites
- `schema_version` stored on every record for forward compatibility
- Local dev uses SQLite (no external DB needed)
- Production uses Railway PostgreSQL

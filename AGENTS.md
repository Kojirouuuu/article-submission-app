# Repository Guidelines

## Project Structure & Modules
- `app/`: Next.js App Router pages and layouts (e.g., `app/page.tsx`, `app/posts/[id]/page.tsx`). Server Actions live under `app/actions/` and data access in `app/lib/prisma.ts`.
- `prisma/`: Prisma schema and migrations (`prisma/schema.prisma`). Client is generated to `app/generated/prisma/`.
- `public/`: Static assets (SVGs, favicon).
- Config: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `Dockerfile`, `docker-compose.yml`.

## Build, Test, and Development
- `npm run dev`: Start the app at `http://localhost:3000`.
- `npm run build`: Production build (`output: "standalone"`).
- `npm start`: Run the built app.
- `npm run lint`: Lint with ESLint (Next.js core-web-vitals rules).
- Database (local): `docker-compose up -d` to start Postgres. Set `DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DB"` in `.env`.
- Prisma: `npx prisma migrate dev` (apply migrations) and `npx prisma generate` (create client). Note: Docker build uses a dummy `DATABASE_URL` only to run `prisma generate`.

## Coding Style & Naming
- Language: TypeScript, `strict` mode, 2-space indent.
- Linting: Follow Next.js ESLint config; fix issues before PRs.
- Files: Pages as `page.tsx` in route folders; components PascalCase; folders and routes kebab-case; variables/functions camelCase.
- Server utilities: Put writes in `app/actions/prisma/actions.ts` (`'use server'`), reads in `app/actions/prisma/queries.ts` (`'use cache'`).
- Styling: Tailwind CSS v4 utilities in `app/globals.css`.

## Testing Guidelines
- No test framework is configured yet. If adding tests, use Jest/Vitest + React Testing Library. Name files `*.test.ts(x)` and co-locate with sources or place under `tests/`. Aim for meaningful coverage of pages, actions, and Prisma queries.

## Commit & Pull Requests
- Commits: Use Conventional Commits (e.g., `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`). Keep messages imperative and scoped.
- PRs: Include summary, screenshots for UI changes, test/verification steps, linked issues (e.g., `Closes #123`), and notes on DB migrations if applicable. Ensure `npm run lint` passes and migrations are included.

## Security & Configuration
- Do not commit `.env` or credentials. Use `dotenv` locally.
- Required env: `DATABASE_URL`; optional `POSTGRES_*` for `docker-compose`.
- Avoid logging secrets; debug DB access sparingly.

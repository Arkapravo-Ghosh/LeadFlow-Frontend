# LeadFlow Frontend

[Frontend repository](https://github.com/Arkapravo-Ghosh/LeadFlow-Frontend) ·
[LeadFlow parent](https://github.com/Arkapravo-Ghosh/LeadFlow) ·
[Backend repository](https://github.com/Arkapravo-Ghosh/LeadFlow-Backend)

The Next.js interface for LeadFlow: sign in to your private workspace, create leads, search/filter them, record
conversations, schedule follow-ups and change status on one screen. It preserves
the configured shadcn preset and supports persistent light/dark mode.

## Run the complete app locally

Use the parent repository so Compose supplies FastAPI and local PostgreSQL:

```sh
git clone --recurse-submodules https://github.com/Arkapravo-Ghosh/LeadFlow.git
cd LeadFlow
cp .env.example .env
# Replace BACKEND_API_KEY and POSTGRES_PASSWORD with random hex values.
docker compose up --build --watch
```

Open `http://localhost:3000`, or the configured `FRONTEND_PORT`. Only Next.js has a
host port. Compose supplies this application's environment variables automatically.
Create an account through `docker compose exec backend uv run leadflow-create-user`,
then sign in at `/login`. No default credentials are embedded in the UI.

## Deploy this repository to Vercel

Import [LeadFlow-Frontend](https://github.com/Arkapravo-Ghosh/LeadFlow-Frontend),
select Next.js and Node 24, install with `npm ci`, and build with `npm run build`.
The Node type definitions match Node 24 and Vitest’s peer requirements. Commit
the lockfile with dependency changes. `npm run typecheck` generates Next.js route
types first, so it also works in a clean checkout.

Set the following server environment variables, also listed in [.env.example](.env.example):

| Variable | Purpose |
| --- | --- |
| `BACKEND_API_URL` | Render API HTTPS origin, without `/api/v1` |
| `BACKEND_API_KEY` | Same private service credential configured on Render |
| `APP_TIMEZONE` | Display/input timezone, e.g. `Asia/Kolkata` |
| `APP_URL` | Public frontend origin, including your configured domain |

SSR, Server Actions and authentication Route Handlers call FastAPI through `server-only` modules. No backend URL,
credential or database connection is sent to browser code. Environment variables
must not have a `NEXT_PUBLIC_` prefix. Sessions use an HTTP-only SameSite cookie;
HTTPS production sets Secure. Login/logout require the exact `APP_URL` origin,
so set it for each deployment (including previews).

See the parent's [deployment guide](https://github.com/Arkapravo-Ghosh/LeadFlow/blob/main/docs/deployment.md)
for the full Render/Neon/Vercel setup and domain configuration.

## Code structure and checks

- `src/app`: workspace/login pages, same-origin login/logout handlers and health route.
- `src/features/auth`: login form and sign-out control.
- `src/features/leads`: lead components, validation, filters and server actions.
- `src/features/discussions`: timeline, discussion form and follow-up input.
- `src/components/ui`: reusable shadcn primitives.
- `src/lib/server`: authenticated private API client, session cookies, origin checks and configuration.
- `src/lib/api-types.ts`: generated OpenAPI contract; regenerate from the parent checkout.

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

[Architecture](https://github.com/Arkapravo-Ghosh/LeadFlow/blob/main/docs/architecture.md) ·
[API contract](https://github.com/Arkapravo-Ghosh/LeadFlow/blob/main/docs/api.md) ·
[Verification and screenshots](https://github.com/Arkapravo-Ghosh/LeadFlow/blob/main/docs/verification.md)

Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
From the parent checkout, `./scripts/install-hooks.sh` installs the shared hooks.
Commit and push frontend changes before updating its submodule pointer in the parent.

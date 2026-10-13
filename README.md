# LeadFlow Frontend

[Frontend repository](https://github.com/Arkapravo-Ghosh/LeadFlow-Frontend) ·
[LeadFlow parent](https://github.com/Arkapravo-Ghosh/LeadFlow) ·
[Backend repository](https://github.com/Arkapravo-Ghosh/LeadFlow-Backend)

The Next.js interface for LeadFlow: create leads, search/filter them, record
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

## Deploy this repository to Vercel

Import [LeadFlow-Frontend](https://github.com/Arkapravo-Ghosh/LeadFlow-Frontend),
select Next.js and Node 24, install with `npm ci`, and build with `npm run build`.
Set the following server environment variables, also listed in [.env.example](.env.example):

| Variable | Purpose |
| --- | --- |
| `BACKEND_API_URL` | Render API HTTPS origin, without `/api/v1` |
| `BACKEND_API_KEY` | Same private service credential configured on Render |
| `APP_TIMEZONE` | Display/input timezone, e.g. `Asia/Kolkata` |
| `APP_URL` | Public frontend origin, including your configured domain |

SSR and Server Actions call FastAPI through `server-only` modules. No backend URL,
credential or database connection is sent to browser code. Environment variables
must not have a `NEXT_PUBLIC_` prefix.

See the parent's [deployment guide](https://github.com/Arkapravo-Ghosh/LeadFlow/blob/main/docs/deployment.md)
for the full Render/Neon/Vercel setup and domain configuration.

## Code structure and checks

- `src/app`: page, layout and health route.
- `src/features/leads`: lead components, validation, filters and server actions.
- `src/features/discussions`: timeline, discussion form and follow-up input.
- `src/components/ui`: reusable shadcn primitives.
- `src/lib/server`: private API client and server configuration.
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

# LeadFlow Frontend

[Frontend repository](https://github.com/Arkapravo-Ghosh/LeadFlow-Frontend) ·
[LeadFlow parent](https://github.com/Arkapravo-Ghosh/LeadFlow) ·
[Backend repository](https://github.com/Arkapravo-Ghosh/LeadFlow-Backend)

Live app: [leadflow.arkapravo.in](https://leadflow.arkapravo.in). Vercel CI/CD deploys this repository.

The Next.js interface for LeadFlow: create an account or sign in to your private workspace, create leads, search/filter them, record
conversations, schedule follow-ups and change status on one screen. It preserves
the configured shadcn preset and supports persistent light/dark mode.
The public `/` landing page explains the workflow with clearly labeled example
leads. The protected application lives at `/workspace`; registration and sign-in
redirect there. Loading forms, leads and discussions use animated skeletons;
pending actions use shared spinners with reduced-motion support.

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
Open `/signup` or choose **Create account** on `/login`. New users enter a username,
a 12–128 character password and confirmation, then go straight to an empty private
workspace. Existing users sign in at `/login`. The administrator account CLI stays
available in the backend. No default credentials are embedded in the UI.

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
HTTPS production sets Secure. Sign-up/login/logout require the exact `APP_URL` origin,
so set it for each deployment (including previews).

See the parent's [deployment guide](https://github.com/Arkapravo-Ghosh/LeadFlow/blob/main/docs/deployment.md)
for the full Render/Neon/Vercel setup and domain configuration. In production,
`APP_URL` is `https://leadflow.arkapravo.in` and the server-only `BACKEND_API_URL`
is `https://api.leadflow.arkapravo.in`. No source edit is needed to change domains.
Registration forwards a hash of Vercel’s client IP for the backend rate limit;
other hosting environments share a registration bucket until a trusted source
adapter is provided. The provider IP header is trusted only when Vercel sets `VERCEL=1`.

## Code structure and checks

- `src/app`: public landing page, protected `/workspace`, login/sign-up pages, same-origin account handlers and health route.
- `src/features/marketing`: landing composition, public copy and illustrative workspace preview.
- `src/features/auth`: shared account form, validation, server-rendered auth screen and sign-out control.
- `src/features/leads`: lead components, validation, filters and server actions.
- `src/features/discussions`: timeline, discussion form and follow-up input.
- `src/components/ui`: reusable shadcn primitives, including skeleton and spinner.
- `src/components/brand-*`: shared logo and home link. `public/leadflow-logo.svg`
  is the vector artwork; `src/app/favicon.ico` contains matching 16/32/48px images.
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

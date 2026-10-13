# LeadFlow frontend

Next.js App Router, Server Components/Actions, the original shadcn preset and
next-themes. Feature components live under `src/features/leads`; server API access
lives under `src/lib/server` and cannot be imported into client bundles.

Use the parent Compose project for local development. Vercel uses `npm ci` and
`npm run build`. Set server variables from `.env.example`, replacing `APP_URL`
with your domain. See parent deployment and verification documents.

Checks: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

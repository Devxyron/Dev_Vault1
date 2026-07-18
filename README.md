# DevVault

The internet's most beautiful developer toolkit — a Next.js app with 43 fully
working tools: formatters, converters, generators, and inspectors, in a
dark-luxury glassmorphism UI.

## Tech stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- lucide-react (icons)

The whole app lives in one client component, `components/DevVault.jsx`, and
runs entirely in the browser — no server, no database, no API routes needed
for any of the tools.

## Run it locally

Requires Node.js 18.17 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy to Vercel

**Option A — from GitHub (recommended)**

1. Push this folder to a new GitHub repository (see below).
2. Go to [vercel.com/new](https://vercel.com/new) and import that repository.
3. Vercel auto-detects Next.js — no config needed. Click **Deploy**.

**Option B — from your machine with the Vercel CLI**

```bash
npm i -g vercel
vercel
```

Follow the prompts; running `vercel` again (or `vercel --prod`) redeploys.

## Push to GitHub

From inside this folder:

```bash
git init
git add .
git commit -m "Initial commit: DevVault"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Notes on third-party dependencies

A handful of tools call free public APIs directly from the browser — nothing
routes through a server of ours:

- **DNS Lookup** — Google's public DNS-over-HTTPS resolver (`dns.google`)
- **QR Generator** — `api.qrserver.com` image API
- **Webhook Tester** — `webhook.site`'s public API
- **REST Client** / **Ping** / **Port Checker** — direct `fetch()` calls to
  whatever URL you enter (subject to that target's CORS policy and the
  browser's own port/security restrictions)

Everything else (JSON formatting, hashing, bcrypt, regex, color conversion,
generators, etc.) runs with zero network calls.

## Project structure

```
devvault/
├── app/
│   ├── layout.js       # root layout + metadata
│   ├── page.js         # loads DevVault client-side only
│   └── globals.css     # Tailwind directives
├── components/
│   └── DevVault.jsx    # the entire app (43 tools, UI, everything)
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

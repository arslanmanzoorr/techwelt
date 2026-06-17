# Tech We IT — Website (2026)

Production-grade marketing site for **Tech We IT**: Accenture-inspired minimalist design, automatic language switching, and per-country entity localization.

## Stack
- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS v4**
- **next-intl** — i18n routing, detection, translations
- **Framer Motion** · **lucide-react** · fonts: **Bricolage Grotesque** + **Hanken Grotesk**

## Getting started
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```
> Always demo the **production** build to clients (`npm run build` then `npm start`), never `npm run dev`, over a tunnel.

## Internationalization (languages)
- Locales: **en** (default), **it**, **de**. URLs: `/` (en), `/it`, `/de`.
- **Auto-detection:** `NEXT_LOCALE` cookie → browser `Accept-Language` → default. Handled in [`middleware.ts`](middleware.ts) via next-intl.
- **Manual override** is remembered (cookie). Switch via the header region control.
- **Translations live in [`messages/en.json`](messages/en.json), `it.json`, `de.json`.** Edit copy there — components never hardcode text. Have a native speaker proofread `it`/`de` before launch.

## Country / entity localization (phone + address)
- All office data is in **one file: [`lib/entities.ts`](lib/entities.ts)** — the only place to edit contact details.
- The visitor's country is resolved server-side ([`lib/getEntity.ts`](lib/getEntity.ts)): manual preference cookie → **Vercel IP geo header** (`x-vercel-ip-country`) → default (UK).
- Country and language are **independent** (German speaker in the UK → German text, UK office).
- The active entity drives the **Contact section** and **Footer** automatically.

### ⚠️ Data still needed from the client
- **Germany** — real registered address + phone (currently `placeholder: true` in `lib/entities.ts`).
- **UK** — a dedicated UK phone number (currently reuses the Italy number).

## Hosting
Built for **Vercel** — IP country detection works with zero config there. On other hosts, set an `x-vercel-ip-country` (or `x-country`) header from a geo-IP source, or country detection falls back to the UK default (manual switching still works everywhere).

## Structure
```
app/[locale]/      home + about · services · industries · contact · faqs · news · news/[slug]
app/admin/         login · dashboard · editor (news CMS, outside i18n)
i18n/              routing, navigation, request config
messages/          en.json · it.json · de.json
lib/               entities.ts (offices) · getEntity.ts · db.ts (Neon) · auth.ts
components/        sections + EntityProvider + RegionSwitcher + LatestNews + ui/
middleware.ts      locale detection (admin + api excluded)
public/            logo.png · mark.png · icon.png
```

## News & Admin (CMS)
- **Public:** `/news` (list) and `/news/<slug>` (article). The homepage shows the latest 3 (hidden until news exists).
- **Admin:** `/admin` — password login, then create/edit/publish/delete posts. Each post has a title, excerpt, cover-image URL, Markdown body (with live preview), and a published/draft toggle.
- **Storage:** Neon Postgres. The `news_posts` table is created automatically on first use — no migrations to run.
- **Required env vars** (see `.env.example`):
  - `DATABASE_URL` — Neon connection string (free at https://neon.tech)
  - `ADMIN_PASSWORD` — password for `/admin`
  - `ADMIN_SECRET` — (optional) random string to sign the session cookie
- Without `DATABASE_URL` the site still runs: public news shows an empty state and the admin shows a "connect a database" notice.
- For local dev, put these in `.env.local` (git-ignored). For production, set them in Vercel's project settings.

## Notes
- Direct cover-image **upload** isn't wired yet — paste an image URL. Can be added later via Vercel Blob.
- The contact form shows a front-end success state; wire it to your email/CRM endpoint in [`components/Contact.tsx`](components/Contact.tsx).
- Testimonials use Unsplash portraits as placeholders — swap for real client photos.
- The glowy-waves hero background lives in [`components/ui/glowy-waves.tsx`](components/ui/glowy-waves.tsx) (adapted from 21st.dev).
- The contact form shows a front-end success state; wire it to your email/CRM endpoint in [`components/Contact.tsx`](components/Contact.tsx).
- Testimonials use Unsplash portraits as placeholders — swap for real client photos.
- The earlier WebGL shader hero was retired in favor of the Accenture-minimal hero (`components/ui/web-gl-shader.tsx` remains in the repo if you want it back).

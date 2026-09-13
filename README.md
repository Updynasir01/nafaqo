# Nafaqo Kitchen — website

Next.js 15 (App Router) + TypeScript + Tailwind CSS, with Neon Postgres for the two form endpoints. Built to deploy on Vercel.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15, App Router, React 19, server components by default |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS, brand tokens in `tailwind.config.ts` |
| Type | Figtree via `next/font/google` (self-hosted at build) |
| Icons | `lucide-react`, individually imported through `components/Icon.tsx` |
| Database | Neon Postgres via `@neondatabase/serverless` (HTTP driver — works on Vercel Edge/Node without pooling) |
| Images | `next/image`, AVIF/WebP |

## Getting started

```bash
npm install
cp .env.example .env          # then paste your Neon connection string
npm run db:init               # creates the subscribers + partner_enquiries tables
npm run dev                   # http://localhost:3000
```

## Database (Neon)

1. Create a project at [console.neon.tech](https://console.neon.tech) — or, on Vercel, **Storage → Create → Neon**, which sets `DATABASE_URL` for you.
2. Copy the pooled connection string (must include `?sslmode=require`) into `DATABASE_URL`.
3. Run `npm run db:init`. It applies `lib/schema.sql`:
   - `subscribers` — `id, email (unique), source, created_at`
   - `partner_enquiries` — `id, name, organisation, email, partner_type, message, created_at`

Queries go through `lib/db.ts`, which exports `getSql()` — a lazily created client, so a build never requires `DATABASE_URL`. All statements use tagged templates and are parameterised.

If `DATABASE_URL` is missing at runtime the two form endpoints return a 500 and log the reason; the rest of the site is unaffected.

## API routes

| Route | Method | Body | Notes |
| --- | --- | --- | --- |
| `/api/subscribe` | POST | `{ email }` | Footer newsletter. Validates the address, `on conflict do nothing` so repeat sign-ups are idempotent. |
| `/api/enquiries` | POST | `{ name, email, message, organisation?, partnerType? }` | Contact page form. |

Both return `{ ok: true }` or `{ error }` with 4xx/5xx. Neither leaks database errors to the client.

## Deploying to Vercel

> **Keep Next.js patched.** Vercel blocks deployments of Next.js versions vulnerable to CVE-2025-66478 (React Server Components RCE). The build will succeed and then the *deploy* step fails with "Vulnerable version of Next.js detected". This project pins `next@^15.5.7` and `react@^19.2.3`, which are patched. If you ever see that failure again, run `npx fix-react2shell-next --fix`, commit the updated `package.json` **and lockfile**, and redeploy. Do not use the `DANGEROUSLY_DEPLOY_VULNERABLE_CVE_2025_66478` override — the vulnerability allows remote code execution.


1. Push the repo to GitHub and import it in Vercel (framework auto-detected).
2. Add the `DATABASE_URL` environment variable for Production, Preview and Development.
3. Deploy. Run `npm run db:init` once locally against the production database, or paste `lib/schema.sql` into the Neon SQL editor.
4. Point `nafaqo.org` at the project and update `metadataBase` in `app/layout.tsx` if the domain differs.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — hero, statement + farm-to-child chain, model panel, partner tiles, Why Nafaqo + financing, operating standard, evidence, closing CTA |
| `/about` | Who We Are, purpose card, origin notes, values, core strengths, at a glance, ambition |
| `/model` | The Nafaqo Model — interactive hub-and-spoke diagram, operating standard, PPP and cost |
| `/what-we-do` | Six capabilities; `?c=1–6` preselects one (the homepage tiles link here) |
| `/strategy` | Four priorities, the four-phase roadmap, financing, the funding-mix table (`#financing`) |
| `/impact` | The eight published metrics, reporting cadence, jobs and local value (`#publish`, `#local-value`) |
| `/partnerships` | The four partner groups, the partnership principle, founding support |
| `/contact` | Office, email, web, and the enquiry form |

## Project structure

```
app/
  layout.tsx            root layout: fonts, metadata, Navbar + Footer
  globals.css           Tailwind layers and base styles
  page.tsx              home
  about|model|what-we-do|strategy|impact|partnerships|contact/page.tsx
  api/subscribe/route.ts
  api/enquiries/route.ts
components/
  Navbar.tsx            sticky header, mobile menu
  Footer.tsx            CTA band, subscribe, link columns, wordmark bleed
  ModelDiagram.tsx      interactive hub-and-spoke (client)
  ChainStrip.tsx        farm-to-child chain (client)
  CapabilityExplorer.tsx six capabilities + detail panel (client)
  SubscribeForm.tsx / EnquiryForm.tsx
  Reveal.tsx            IntersectionObserver scroll reveal
  Icon.tsx              Lucide wrapper, stroke-width 2.4
  ui.tsx                Shell, Section, Kicker, PageHero, PillLink, Quote
content/site.ts         ALL copy and data, in one file
lib/db.ts, lib/schema.sql
scripts/init-db.mjs
public/assets/          logo + five photographs
```

## Design system

Tokens live in `tailwind.config.ts`:

- **Green** ramp 100–900, base dark panel `green-800` (#123B28), deepest `green-900` (#0B2A1C)
- **Gold** ramp 100–900, accent on dark grounds `gold-400` (#DDB855)
- **Sand** warm neutrals, ground `#FFFFFF`, alternating band `surface` `#F5F3EE`, ink `#1A2620`
- Radius 8 / 16 / 28px, pills at `rounded-full`; container `max-w-shell` (1240px)
- Headlines are fluid `clamp()` values held in the page files

Do not introduce colours outside these ramps.

## Content rule

Every line of copy comes from the Nafaqo Kitchen Institutional Profile and lives in `content/site.ts`. **Do not add statistics, partnerships, funding figures, impact numbers, testimonials, awards, phone numbers or social accounts that are not in that document.** The Impact page deliberately lists metric names without figures until the Mogadishu pilot reports.

## Accessibility

One `h1` per page; ordered `h2`/`h3` beneath. Focus ring is a 2px gold outline at 3px offset — never the browser default. Photographs carry descriptive alt text. The model tabs, chain steps and capability list are all real buttons, keyboard-operable. All motion is disabled under `prefers-reduced-motion`.

## Before launch

1. **Logo** — replace `public/assets/nafaqo-logo.png` with an SVG, and supply a white/mono version for dark grounds (the footer currently sets the colour logo on a light chip).
2. **Photography** — the five images were extracted from the Institutional Profile PDF. Confirm licensing, then re-export at display size (they are 1–2MB PNGs; WebP/AVIF at ~1600px wide is plenty).
3. **Email notifications** — the endpoints only store rows. Add Resend/Postmark if the team should be emailed on each enquiry.
4. **Spam** — consider a honeypot field or Vercel/Cloudflare Turnstile on both forms.
5. **Analytics and sitemap** — add `app/sitemap.ts`, `app/robots.ts` and an OG image.
6. **Social accounts** — none appear in the profile, so none are linked.

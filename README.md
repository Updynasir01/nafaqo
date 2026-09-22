# Nafaqo Kitchen — website and dashboard

Next.js 15 (App Router) + Tailwind + Neon Postgres. Deploys to Vercel as-is.

## Pages

| Route | Contents |
| --- | --- |
| `/` | Hero video, farm-to-child chain, hub-and-spoke model, outcomes, partners |
| `/about/who-we-are` | Story, vision and mission, values, where we are starting, FAQ |
| `/about/why-nafaqo` | What we hold together, co-investment, what we will publish, local value |
| `/model/how-it-works` | Hub and spoke, priorities and phases, who we work with |
| `/model/what-we-do` | The six-capability explorer and the operating standard |
| `/insights/news` | Published posts — title, summary and a Read more link |
| `/insights/news/[id]` | The full article page |
| `/insights/reports` | Reporting commitments and downloadable documents |
| `/contact` | Office, phone, email and the enquiry form |
| `/admin` | Content and operations dashboard (password-protected) |
| `/admin/login` | Sign-in |

## Running locally

```bash
npm install
cp .env.example .env.local     # add DATABASE_URL and ADMIN_KEY
npm run db:init                # creates the tables
npm run dev
```

## Deploying to Vercel

1. Import the repository.
2. Storage → Create → Neon. Vercel sets `DATABASE_URL` for this project.
3. Add `ADMIN_KEY` as an environment variable (any long random string).
4. Deploy, then run `npm run db:init` locally against the same `DATABASE_URL` once.

The build never touches the database, so a missing `DATABASE_URL` cannot fail the build — public pages simply render without database content.

## The dashboard

`/admin` is protected by `middleware.ts`, which guards **`/admin`, every route beneath it, and `/api/admin/*`**. Without a valid session, pages redirect to `/admin/login` and API routes return 401. Each route also re-checks the session server-side, so a route can never be reached with a forged cookie.

Sessions are an HMAC-signed, httpOnly, `sameSite=lax` cookie (secure in production), valid 12 hours. They are signed with `ADMIN_KEY`, so **rotating `ADMIN_KEY` signs everyone out**.

**First sign-in** uses `ADMIN_KEY` as the password. That seeds a PBKDF2 hash (120,000 iterations, per-password salt) into `app_settings`, after which **Settings → Change the dashboard password** controls access; `ADMIN_KEY` stays only as the session-signing secret. Changing the password requires the current one and a minimum of 10 characters.

**Sign out** is in the dashboard header.

Writing an article: fill Category, Title, Summary and Article in the New post form. The news card shows the title and summary with a **Read more** link; the Article text becomes `/insights/news/[id]`. Leave a blank line between paragraphs. Posts stay hidden until you press Publish.

API routes, all session-gated:

- `GET /api/admin/data` — enquiries, subscribers, posts, documents
- `POST /api/admin/action` — `enquiry.status`, `post.create`, `post.publish`, `post.delete`, `document.update`
- `POST /api/admin/password` — change the password
- `POST /api/admin/login` / `POST /api/admin/logout` — session in and out

PDFs are attached by **link**: upload the file to Vercel Blob, Drive or Dropbox and paste the URL. There is no file storage wired in yet.

## Email notifications

Enquiries are stored in `partner_enquiries` and shown in the dashboard. To also email them, add a provider key (Resend or similar) and send from `app/api/enquiries/route.ts` after the insert.

## Tables

`subscribers`, `partner_enquiries`, `posts`, `documents`, `app_settings` — see `lib/schema.sql`.

Re-run `npm run db:init` after upgrading: it is idempotent and adds `app_settings`, which the password change needs.

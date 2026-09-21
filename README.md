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
| `/insights/news` | Published posts from the database |
| `/insights/reports` | Reporting commitments and downloadable documents |
| `/contact` | Office, phone, email and the enquiry form |
| `/admin` | Content and operations dashboard (key-protected) |

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

`/admin` asks for `ADMIN_KEY`, held in `sessionStorage` and sent as an `x-admin-key` header. It reads and writes through two routes:

- `GET /api/admin/data` — enquiries, subscribers, posts, documents
- `POST /api/admin/action` — `enquiry.status`, `post.create`, `post.publish`, `post.delete`, `document.update`

PDFs are attached by **link**: upload the file to Vercel Blob, Drive or Dropbox and paste the URL. There is no file storage wired in yet.

## Email notifications

Enquiries are stored in `partner_enquiries` and shown in the dashboard. To also email them, add a provider key (Resend or similar) and send from `app/api/enquiries/route.ts` after the insert.

## Tables

`subscribers`, `partner_enquiries`, `posts`, `documents` — see `lib/schema.sql`.

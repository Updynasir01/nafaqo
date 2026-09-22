# Update — 18 files

Unzip and copy over `nafaqo-web/`, keeping the folder structure exactly as it is here.

## New (11)

    middleware.ts                            guards /admin, /admin/*, /api/admin/*
    lib/session.ts                           HMAC-signed session cookie
    lib/password.ts                          PBKDF2 hashing
    components/LoginForm.tsx                 sign-in form
    app/admin/login/page.tsx                 /admin/login
    app/api/admin/login/route.ts             sign in
    app/api/admin/logout/route.ts            sign out
    app/api/admin/password/route.ts          change password
    app/insights/news/[id]/page.tsx          article page

## Replaced (7)

    lib/admin.ts                             cookie gate instead of header key
    lib/schema.sql                           adds app_settings
    components/Navbar.tsx                    mobile dropdowns + X close icon
    components/AdminConsole.tsx              Article field, Sign out, Settings
    app/insights/news/page.tsx               clamped summary + Read more
    app/api/admin/data/route.ts              session gate
    app/api/admin/action/route.ts            session gate
    README.md
    .env.example

The folder name `[id]` is literal — square brackets included. That is Next.js dynamic routing, not a placeholder.

## After copying

    npm run db:init     # idempotent; adds app_settings
    npm run dev

`ADMIN_KEY` must be set. It is the password for the first sign-in only — after that, change it in Settings. Rotating it signs everyone out.

# Ohelpbro

A production-ready marketing and lead-generation website for **Ohelpbro** — a tech-driven platform by Ophiliya & Co connecting customers with trusted cleaning and manpower staffing professionals.

Includes role-based dashboards (Admin, Customer, Professional) with Cloudflare D1 database.

## Tech Stack

- Next.js 15 (App Router) on Cloudflare Workers (OpenNext)
- Cloudflare D1 (SQLite) + Drizzle ORM
- Session auth (bcrypt + JWT cookies)
- TypeScript, Tailwind CSS, ShadCN UI
- React Hook Form + Zod

## Getting Started (Local)

```bash
npm install
cp .dev.vars.example .dev.vars
# Edit .dev.vars with SESSION_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm run db:migrate:local
npm run preview
```

For full Cloudflare bindings (D1), use `npm run preview` instead of `npm run dev`.

## Environment Variables

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=919538033894
SESSION_SECRET=your-random-secret-min-32-chars
ADMIN_EMAIL=admin@ohelpbro.in
ADMIN_PASSWORD=your-secure-password
```

Set these in Cloudflare Dashboard → Workers → ohelpbro → Settings → Variables, or via:

```bash
npx wrangler secret put SESSION_SECRET
npx wrangler secret put ADMIN_EMAIL
npx wrangler secret put ADMIN_PASSWORD
```

## Database

```bash
# Apply migrations to remote D1
npm run db:migrate:remote

# Bootstrap first admin (after deploy, one-time)
curl -X POST https://ohelpbro.vineshjm.workers.dev/api/admin/bootstrap
```

## Dashboard Roles

| Role | Path | Access |
|---|---|---|
| Admin | `/dashboard/admin` | All leads, users, approvals, assignments |
| Customer | `/dashboard/customer` | Own requests and profile |
| Professional | `/dashboard/professional` | Assigned jobs and profile |

Login at `/login`.

## Public Pages

| Route | Description |
|---|---|
| `/` | Home |
| `/contact` | Contact form (saves to DB + optional WhatsApp notify) |
| `/register-customer` | Customer registration (pending account) |
| `/register-professional` | Professional registration (pending account) |

## Deploy

```bash
npm run deploy
```

## Form Flow

1. User submits form → saved to D1 (`leads` table)
2. Registration forms also create a **pending** user account
3. Success screen shows optional **Notify Admin via WhatsApp** button
4. Admin approves users and manages leads in dashboard

## License

© 2026 Ohelpbro (Ophiliya & Co). All rights reserved.

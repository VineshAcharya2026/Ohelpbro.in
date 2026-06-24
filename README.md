# Ohelpbro

A production-ready marketing and lead-generation website for **Ohelpbro** — a tech-driven platform by Ophiliya & Co connecting customers with trusted cleaning and manpower staffing professionals.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + ShadCN UI
- Framer Motion
- React Hook Form + Zod
- Nodemailer

## Getting Started

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your SMTP and WhatsApp details
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

```env
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CONTACT_EMAIL=
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
```

## Pages

| Route | Description |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/services` | Cleaning Services |
| `/staffing` | Manpower Staffing |
| `/contact` | Contact Us |
| `/register-customer` | Customer Registration |
| `/register-professional` | Professional Registration |
| `/careers` | Careers |
| `/terms` | Terms & Conditions |
| `/privacy` | Privacy Policy |

## Deployment

Deploy to [Vercel](https://vercel.com) or [Cloudflare Pages](https://pages.cloudflare.com). Set environment variables in your hosting dashboard.

## License

© 2026 Ohelpbro (Ophiliya & Co). All rights reserved.

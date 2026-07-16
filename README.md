# TablatureDB

A tablature management app built with Svelte 5, better-auth, Drizzle ORM, and Tailwind CSS 4.

## Stack

- **Framework**: Svelte 5 (runes mode)
- **Auth**: better-auth (email/password + Google + GitHub OAuth)
- **Database**: PostgreSQL via Neon + Drizzle ORM
- **ORM**: Drizzle Kit (migrations, push, studio)
- **Email**: Resend (verification, password reset, email change)
- **Styling**: Tailwind CSS 4 + shadcn-svelte components
- **Forms**: sveltekit-superforms + Zod 4
- **Hosting**: Railway (adapter-node)

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (Neon recommended)
- Resend API key
- Google OAuth credentials (optional)
- GitHub OAuth credentials (optional)

### Environment Variables

```bash
# Database
DATABASE_URL="postgres://..."

# Auth
BETTER_AUTH_URL="http://localhost:5173"
BETTER_AUTH_SECRET="..."

# Resend
RESEND_API_KEY="re_..."

# OAuth (optional)
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

Install & Run
```bash
npm install
npm run db:push    # Create tables
npm run dev        # Start dev server
```

Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| npm run dev         | Start dev server             |
| npm run build       | Production build             |
| npm run preview     | Preview production build     |
| npm run check       | Type-check with svelte-check |
| npm run lint        | Prettier + ESLint            |
| npm run format      | Prettier format              |
| npm run db:push     | Push schema to DB            |
| npm run db:generate | Generate migration           |
| npm run db:migrate  | Run migrations               |
| npm run db:studio   | Open Drizzle Studio          |

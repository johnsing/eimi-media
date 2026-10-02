# Eimi Media (N-Menashe)

Community media portal built with **React 19 + Vite + Supabase**.

## Features

- **Public browsing** — no account required to explore the app
- Community feed with infinite scroll and search
- Rich-text post editor (TipTap)
- Public dashboard with community stats (management actions still require an admin sign-in)
- Light/dark theme with system preference detection

## Tech Stack

- React 19, Vite 8, React Router 7
- Supabase (auth, Postgres, RLS)
- styled-components, TipTap editor

## Getting Started

```bash
npm install
cp .env.example .env   # fill in your Supabase credentials
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Supabase Notes

For logged-out visitors to read the feed, ensure your RLS policies allow
anonymous `select` on the `posts` table:

```sql
create policy "Public read access" on posts
  for select to anon, authenticated
  using (true);
```

Posting requires an account (posts need a `user_id`).

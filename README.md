# Droker Agentic Hub

## Features

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Cookie-based Authentication
- PostgreSQL with Prisma ORM
- Supabase for Storage
- Edge Runtime Support
- Internationalization with next-intl
- Responsive Design
- Dark Mode Support

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Cookie-based Authentication
- PostgreSQL
- Prisma ORM
- Supabase
- next-intl

## Environment Variables

The following environment variables are required:

- `DATABASE_URL` - PostgreSQL database URL
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `NEXT_PUBLIC_SUPABASE_URL` - Public Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public Supabase anonymous key
- `JWT_SECRET` - Secret key for JWT tokens
- `COOKIE_NAME` - Name of the authentication cookie

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up environment variables in `.env`
4. Run database migrations with `npx prisma migrate dev`
5. Start the development server with `npm run dev`

## Known Issues and Solutions

1. Edge Runtime compatibility - Fixed by modifying middleware.ts and next.config.js
2. Prisma schema incompatibilities - Fixed by updating schema and queries

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

MIT 
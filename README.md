# Droker Agentic Hub

Droker Agentic Hub is a multi-tenant application for managing AI agents and products.

## Features

- Admin and Superadmin portals
- Product management
- User management
- API key management
- Internationalization support (English and Spanish)
- Authentication with Clerk.js

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL Database (via Supabase)
- Clerk.js for Authentication
- Vercel for Deployment

## Deployment

The application is deployed on Vercel. The following environment variables need to be set in the Vercel project:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk.js publishable key
- `CLERK_SECRET_KEY` - Clerk.js secret key
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` - Clerk.js sign-in URL
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL` - Clerk.js sign-up URL
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` - Clerk.js after sign-in redirect URL
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` - Clerk.js after sign-up redirect URL
- `NEXT_PUBLIC_APP_URL` - Public URL of the application

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Run the development server: `npm run dev`

## Database Schema

The database schema is managed with Prisma. The main entities are:

- `User` - Application users
- `Organization` - Organizations that users belong to
- `Product` - Products owned by organizations
- `ApiKey` - API keys for interacting with products
- `Subscription` - Organization subscriptions

## Recent Issues & Fixes

When deploying to production, we encountered several issues related to:

1. Edge Runtime compatibility issues with Clerk.js - Fixed by modifying middleware.ts and next.config.js
2. Prisma schema incompatibilities - Fixed by removing clerkId field from queries as it was not properly recognized in the UserWhereInput type
3. Import issues with Prisma enums - Fixed by removing direct imports of Prisma enums

## Scripts

- `npm run dev` - Run the development server
- `npm run build` - Build the application
- `npm run start` - Start the production server
- `npm run create-admin` - Create a test admin user

## License

Private and confidential - All rights reserved. 
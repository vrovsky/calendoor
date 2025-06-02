Calendly clone
Monorep, Next.Js 15, Drizzle ORM, Neon, Clerk, Google Calendar API

check .env file:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=****
CLERK_SECRET_KEY=****
NEXT_PUBLIC_CLERK_SING_IN_URL=/login
NEXT_PUBLIC_CLERK_SING_UP_URL=/register
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/events
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/events
DATABASE_URL=****


To run localy:
npm run dev
npm run db:generate
npm run db:studio

# FinAcademy Tech Stack

## Backend Stack
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript for type safety
- **Database**: PostgreSQL (production) / SQLite (development) 
- **ORM**: Prisma for database management
- **Authentication**: JWT tokens + bcrypt password hashing
- **Security**: Helmet, CORS, express-rate-limit, express-validator
- **Development**: tsx watch, ts-node for development

## Frontend Stack
- **Framework**: Next.js 14 with App Router
- **UI Library**: React 18 with TypeScript
- **Styling**: Tailwind CSS with @tailwindcss/typography
- **UI Components**: Radix UI components (dialog, dropdown, tabs, progress)
- **State Management**: Zustand stores
- **Data Fetching**: Native fetch with custom API client (axios)
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge
- **Markdown**: react-markdown for content rendering

## Database
- **ORM**: Prisma Client
- **Production**: PostgreSQL 
- **Development**: SQLite with better-sqlite3
- **Migrations**: Prisma migrate
- **Seeding**: Custom seed scripts with tsx

## Development Tools
- **Package Manager**: npm
- **Build Tool**: TypeScript compiler (tsc) for backend, Next.js build for frontend
- **Dev Server**: tsx watch for backend, next dev for frontend
- **Concurrency**: concurrently for running both servers
- **Linting**: ESLint with Next.js config
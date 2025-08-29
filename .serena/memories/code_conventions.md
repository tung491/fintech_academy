# FinAcademy Code Conventions

## TypeScript Configuration
### Backend (Node.js/Express)
- **Target**: ES2022
- **Module**: CommonJS
- **Strict mode**: Enabled with all strict checks
- **Unused code detection**: Enabled (noUnusedLocals, noUnusedParameters)
- **Source maps**: Enabled for debugging
- **Build output**: `./dist` directory

### Frontend (Next.js/React)
- **Target**: ES2017
- **Module**: ESNext with bundler resolution
- **JSX**: Preserve (handled by Next.js)
- **Path mapping**: `@/*` for `./src/*`
- **Strict mode**: Enabled
- **Next.js plugins**: Integrated

## File Structure Patterns
### Backend (`backend/src/`)
- **Routes**: `/routes/*.ts` - API endpoint handlers
- **Middleware**: `/middleware/*.ts` - Express middleware
- **Database**: `/db/*.ts` - Database configuration, migrations, seeds
- **Entry point**: `index.ts`

### Frontend (`frontend/src/`)
- **App Router**: `/app/` - Next.js 14 app router pages
- **Components**: `/components/` - Reusable React components
- **Libraries**: `/lib/` - Utilities and API client
- **Stores**: `/stores/` - Zustand state management
- **Styles**: `globals.css` - Global Tailwind styles

## Naming Conventions
- **Files**: kebab-case for components, camelCase for utilities
- **Variables/Functions**: camelCase
- **Types/Interfaces**: PascalCase
- **Constants**: UPPER_SNAKE_CASE
- **Database fields**: camelCase in TypeScript, snake_case in SQL

## Code Style
- **Import organization**: External libraries first, then internal modules
- **Error handling**: Consistent error responses with proper HTTP status codes
- **Authentication**: JWT tokens stored in cookies/localStorage
- **API responses**: JSON with consistent structure
- **Database queries**: Prisma ORM with type safety
- **State management**: Zustand for global state, React hooks for local state
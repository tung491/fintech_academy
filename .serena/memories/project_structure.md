# FinAcademy Project Structure

## Root Directory
```
finacademy/
├── backend/                 # Node.js/Express API server
├── frontend/               # Next.js React application  
├── .serena/                # AI assistant memory files
├── plans.md                # Long-term development plans
├── todos.md                # Current issues and tasks
├── package.json            # Root package with scripts
├── docker-compose.yml      # Docker orchestration
├── start-local.sh          # Development startup script
├── test-login.sh          # Authentication testing script
├── setup.sh               # Initial setup script
└── README.md              # Project documentation
```

## Backend Structure (`backend/src/`)
```
backend/src/
├── db/                    # Database management
│   ├── prisma.ts         # Prisma client configuration
│   ├── migrate.ts        # Migration utilities
│   ├── seed.ts           # Database seeding
│   ├── schema.sql        # SQL schema definitions
│   └── sqlite-*.ts       # SQLite-specific files
├── middleware/           # Express middleware
│   ├── auth.ts          # JWT authentication
│   └── errorHandler.ts  # Error handling
├── routes/              # API endpoints
│   ├── auth.ts          # Authentication routes
│   ├── courses.ts       # Course management
│   ├── lessons.ts       # Lesson content
│   ├── progress.ts      # User progress tracking
│   ├── quizzes.ts       # Quiz functionality
│   └── users.ts         # User management
└── index.ts             # Express server entry point
```

## Frontend Structure (`frontend/src/`)
```
frontend/src/
├── app/                  # Next.js 14 App Router
│   ├── courses/         # Course browsing and details
│   │   └── [courseId]/  # Dynamic course pages
│   │       └── week/    # Week-specific content
│   ├── dashboard/       # User dashboard
│   ├── login/           # Authentication pages
│   ├── profile/         # User profile management
│   ├── quizzes/         # Quiz taking interface
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Homepage
├── components/          # Reusable React components
│   ├── Header.tsx       # Navigation header
│   ├── ThemeToggle.tsx  # Dark/light mode toggle
│   ├── Providers.tsx    # Context providers
│   └── DebugInfo.tsx    # Development debugging
├── lib/                 # Utility libraries
│   └── api.ts          # API client with authentication
├── stores/              # Zustand state management
│   ├── authStore.ts     # Authentication state
│   └── themeStore.ts    # Theme state
└── globals.css          # Global Tailwind styles
```

## Key Configuration Files
- `backend/prisma/schema.prisma` - Database schema
- `backend/.env` - Environment variables
- `frontend/tailwind.config.js` - Tailwind CSS configuration  
- `frontend/next.config.js` - Next.js configuration
- `**/tsconfig.json` - TypeScript configurations
- `**/package.json` - Dependency management

## Database Schema (Prisma)
Key entities:
- **Users** - Authentication and profile data
- **Courses** - 12-week curriculum structure
- **Weeks** - Individual week content within courses
- **Lessons** - Specific lesson content within weeks
- **Quizzes** - Assessment functionality
- **UserProgress** - Tracking user advancement
- **QuizAttempts** - Quiz completion records

## Current Development Status
- ✅ Full-stack application functional
- ✅ Authentication system complete
- ✅ Course navigation working
- ✅ Database properly seeded
- ✅ All critical bugs fixed
- 🔄 Ready for enhancement and new feature development
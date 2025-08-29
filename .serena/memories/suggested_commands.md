# FinAcademy Development Commands

## Primary Development Commands

### Start Development Servers
```bash
# Start both frontend and backend concurrently
npm run dev

# Start only backend (runs on localhost:5000)  
npm run server:dev

# Start only frontend (runs on localhost:3000)
npm run client:dev
```

### Installation and Setup
```bash
# Install all dependencies (root, backend, frontend)
npm run install:all

# Individual installations
npm install                    # Root dependencies
cd backend && npm install      # Backend dependencies  
cd frontend && npm install     # Frontend dependencies
```

### Database Management
```bash
# Run database migrations
cd backend && npm run db:migrate

# Seed database with curriculum content
cd backend && npm run db:seed

# Alternative seeding (using Prisma)
cd backend && npx prisma db seed
```

### Build Commands
```bash
# Build both frontend and backend
npm run build

# Build backend only
npm run build:backend

# Build frontend only  
npm run build:frontend
```

### Production Commands
```bash
# Start production server (backend only)
npm start

# Individual build commands
cd backend && npm run build    # TypeScript compilation
cd frontend && npm run build   # Next.js build
```

### Frontend Specific
```bash
cd frontend
npm run dev        # Development server
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint checking
```

### Backend Specific
```bash
cd backend
npm run dev        # Development with tsx watch
npm run build      # TypeScript compilation
npm run start      # Production server
```

## Docker Commands (Alternative)
```bash
# Start entire stack with Docker
docker-compose up --build

# Start in detached mode
docker-compose up -d --build
```

## Useful Development Scripts
```bash
# Test login functionality
./test-login.sh

# Setup script (if needed)
./setup.sh

# Start local development
./start-local.sh
```

## Git Workflow
```bash
# Standard development workflow
git add .
git commit -m "feat: description of changes"
git push origin main
```

## System Commands (Linux)
- `ls` - List directory contents
- `cd` - Change directory  
- `grep` - Search text patterns
- `find` - Find files
- `cat` - Display file contents
- `git` - Version control operations
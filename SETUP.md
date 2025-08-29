# FinAcademy Setup Guide

## Database Setup Options

### Option 1: Install PostgreSQL Locally (Recommended)

#### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
```

Then in PostgreSQL shell:
```sql
CREATE DATABASE finacademy;
CREATE USER finacademy WITH PASSWORD 'finacademy_pass';
GRANT ALL PRIVILEGES ON DATABASE finacademy TO finacademy;
\q
```

#### macOS (using Homebrew):
```bash
brew install postgresql
brew services start postgresql
createdb finacademy
```

#### Configure Environment Variables:
```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials
```

### Option 2: Use Docker (if Docker is available)

Start PostgreSQL with Docker:
```bash
docker run --name finacademy-postgres \
  -e POSTGRES_DB=finacademy \
  -e POSTGRES_USER=finacademy \
  -e POSTGRES_PASSWORD=finacademy_pass \
  -p 5432:5432 \
  -d postgres:15-alpine
```

### Option 3: Use SQLite (Alternative for development)

If you prefer SQLite for development, I can modify the application to use SQLite instead of PostgreSQL.

## Quick Setup Steps

1. **Install dependencies:**
```bash
cd finacademy
npm install
cd backend && npm install
cd ../frontend && npm install
```

2. **Set up database** (choose one option above)

3. **Configure environment:**
```bash
cd backend
cp .env.example .env
# Edit DATABASE_URL in .env
```

4. **Run migrations:**
```bash
npm run migrate
```

5. **Seed database:**
```bash
npm run seed
```

6. **Start development servers:**
```bash
cd .. # back to root
npm run dev
```

## Default Environment Variables

Create `backend/.env`:
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://finacademy:finacademy_pass@localhost:5432/finacademy
JWT_SECRET=your-secret-key-here-change-in-production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

## Troubleshooting

- **Connection refused**: PostgreSQL is not running
- **Authentication failed**: Check username/password in DATABASE_URL
- **Database does not exist**: Run `createdb finacademy` first
- **Permission denied**: Make sure the user has proper privileges

## Next Steps

After database setup is complete:
1. Run `npm run migrate` to create tables
2. Run `npm run seed` to add curriculum content
3. Start the application with `npm run dev`
4. Visit http://localhost:3000
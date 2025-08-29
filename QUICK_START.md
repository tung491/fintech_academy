# 🚀 Quick Start Guide

## Option 1: Automated Setup (Recommended)

Run the setup script:
```bash
cd /home/tung491/fin_account_for_dev/finacademy
./start-local.sh
```

## Option 2: Manual Setup

### 1. Start PostgreSQL
```bash
docker run --name finacademy-postgres \
  -e POSTGRES_DB=finacademy \
  -e POSTGRES_USER=finacademy \
  -e POSTGRES_PASSWORD=finacademy_pass \
  -p 5432:5432 \
  -d postgres:15-alpine
```

### 2. Setup Backend
```bash
cd backend
cp .env.example .env
npm install
npm run migrate
npm run seed
npm run dev  # Starts on port 5000
```

### 3. Setup Frontend (in new terminal)
```bash
cd frontend
npm install
npm run dev  # Starts on port 3000
```

## 🎯 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 👤 Demo Accounts

- **Student**: student@example.com / student123
- **Admin**: admin@finacademy.com / admin123

## 📚 What You'll Find

✅ **12-Week Financial Curriculum**
- Week 1: Financial Literacy & Business Mindset (5 detailed lessons)
- Weeks 2-12: Accounting, Tax, Pricing, Investment, Legal, Scaling, Exits

✅ **Interactive Features**
- User authentication and enrollment
- Progress tracking per lesson
- Quiz system with scoring
- Personal dashboard

✅ **Real Business Knowledge**
- Time value of money calculations
- Cash flow management
- Business model analysis
- Unit economics (CAC, LTV, margins)
- Financial statements and analysis

The content is specifically designed for developers who want to run their own businesses!

## 🛠️ Troubleshooting

**PostgreSQL Connection Issues:**
- Make sure Docker container is running: `docker ps | grep postgres`
- Check port 5432 isn't used by another service: `lsof -i :5432`

**Frontend/Backend Not Starting:**
- Check if ports 3000/5000 are available
- Run `npm install` in respective directories
- Check console logs for specific errors

**Database Issues:**
- Restart PostgreSQL: `docker restart finacademy-postgres`
- Re-run migrations: `cd backend && npm run migrate`
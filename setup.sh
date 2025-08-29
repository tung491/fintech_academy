#!/bin/bash

echo "🎓 FinAcademy Setup"
echo "=================="
echo ""
echo "Choose your setup option:"
echo "1) Docker (PostgreSQL + Full Stack)"
echo "2) SQLite (Simple file database)"  
echo "3) Manual PostgreSQL setup"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
  1)
    echo "🐳 Setting up with Docker..."
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker not found. Please install Docker first."
        exit 1
    fi
    
    echo "Note: This requires Docker permissions. You may need to:"
    echo "1. Run: sudo usermod -aG docker $USER && newgrp docker"
    echo "2. Or run with sudo: sudo docker compose up --build"
    echo ""
    read -p "Continue with Docker setup? (y/n): " confirm
    if [ "$confirm" = "y" ]; then
        docker compose up --build
    fi
    ;;
    
  2)
    echo "📁 Setting up with SQLite..."
    
    # Install better-sqlite3
    cd backend
    npm install better-sqlite3 @types/better-sqlite3
    
    # Create SQLite database
    echo "🗄️ Creating SQLite database..."
    npm run migrate:sqlite || {
        echo "Installing tsx and running migration..."
        npm install tsx
        npx tsx src/db/sqlite-migrate.ts
    }
    
    # Modify pool import to use SQLite
    echo "🔧 Configuring for SQLite..."
    cp src/db/pool.ts src/db/pool.ts.backup
    cp src/db/sqlite-pool.ts src/db/pool.ts
    
    # Seed database
    echo "🌱 Seeding database..."
    DATABASE_TYPE=sqlite npx tsx src/db/seed.ts
    
    # Start servers
    echo "🚀 Starting servers..."
    DATABASE_TYPE=sqlite npm run dev &
    BACKEND_PID=$!
    
    cd ../frontend
    npm run dev &
    FRONTEND_PID=$!
    
    echo ""
    echo "🎉 FinAcademy is running!"
    echo "📍 Frontend: http://localhost:3000"  
    echo "🔌 Backend: http://localhost:5000"
    echo ""
    echo "👤 Demo Accounts:"
    echo "   student@example.com / student123"
    echo "   admin@finacademy.com / admin123"
    echo ""
    echo "Press Ctrl+C to stop"
    wait $BACKEND_PID $FRONTEND_PID
    ;;
    
  3)
    echo "🛠️ Manual PostgreSQL Setup"
    echo ""
    echo "1. Install PostgreSQL:"
    echo "   Ubuntu/Debian: sudo apt install postgresql postgresql-contrib"
    echo "   macOS: brew install postgresql"
    echo ""
    echo "2. Create database:"
    echo "   sudo -u postgres psql"
    echo "   CREATE DATABASE finacademy;"
    echo "   CREATE USER finacademy WITH PASSWORD 'finacademy_pass';"
    echo "   GRANT ALL PRIVILEGES ON DATABASE finacademy TO finacademy;"
    echo ""
    echo "3. Run setup:"
    echo "   cd backend && cp .env.example .env"
    echo "   npm install && npm run migrate && npm run seed"
    echo "   npm run dev"
    echo ""
    echo "4. In another terminal:"
    echo "   cd frontend && npm install && npm run dev"
    ;;
    
  *)
    echo "❌ Invalid choice"
    exit 1
    ;;
esac
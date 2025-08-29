#!/bin/bash

echo "🚀 Starting FinAcademy locally..."

# Check if Docker is available for PostgreSQL
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker or set up PostgreSQL manually."
    exit 1
fi

# Check if PostgreSQL container is running
if ! docker ps | grep -q finacademy-postgres; then
    echo "📊 Starting PostgreSQL container..."
    docker run --name finacademy-postgres \
        -e POSTGRES_DB=finacademy \
        -e POSTGRES_USER=finacademy \
        -e POSTGRES_PASSWORD=finacademy_pass \
        -p 5432:5432 \
        -d postgres:15-alpine
    
    echo "⏳ Waiting for PostgreSQL to start..."
    sleep 5
fi

# Set up environment
cd backend
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created backend/.env file"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d node_modules ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Run migrations
echo "🗄️ Running database migrations..."
npm run migrate

# Seed database
echo "🌱 Seeding database with curriculum..."
npm run seed

# Start backend in background
echo "🔧 Starting backend server..."
npm run dev &
BACKEND_PID=$!

# Move to frontend
cd ../frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d node_modules ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Start frontend
echo "🎨 Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "🎉 FinAcademy is starting up!"
echo ""
echo "📍 Frontend: http://localhost:3000"
echo "🔌 Backend API: http://localhost:5000"
echo ""
echo "👤 Demo Accounts:"
echo "   Student: student@example.com / student123"
echo "   Admin: admin@finacademy.com / admin123"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
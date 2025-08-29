#!/bin/bash

echo "🧪 Testing FinAcademy Login System"
echo "================================"

# Start backend in background
cd backend
echo "🚀 Starting backend server..."
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to initialize..."
sleep 5

# Test health endpoint
echo "🏥 Testing health endpoint..."
curl -s http://localhost:5000/api/health | jq '.' || echo "❌ Health check failed"

# Test login with student account
echo ""
echo "🔐 Testing login with student account..."
curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@example.com","password":"student123"}' | jq '.' || echo "❌ Login test failed"

echo ""
echo "🎯 If you see a token above, login is working!"
echo "📍 You can now access the frontend at http://localhost:3000"

# Start frontend in background
cd ../frontend
echo "🎨 Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "🎉 Both servers are running!"
echo "📍 Frontend: http://localhost:3000"  
echo "🔌 Backend: http://localhost:5000"
echo ""
echo "👤 Demo Accounts:"
echo "   Student: student@example.com / student123"
echo "   Admin: admin@finacademy.com / admin123"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
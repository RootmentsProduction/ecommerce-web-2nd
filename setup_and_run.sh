#!/bin/bash
# Exit immediately if a command exits with a non-zero status
set -e

echo "=================================================="
echo "🚀 E-Commerce Jewel: Complete Setup & Start Script"
echo "=================================================="

# Determine script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# 1. Setup Backend
echo "📦 Setting up Backend..."
cd backend
if [ ! -d "node_modules" ]; then
  echo "Installing backend dependencies..."
  npm install
fi

echo "🔄 Syncing database schema and seeding..."
npx prisma db push
npx prisma db seed

# 2. Setup Frontend
echo "📦 Setting up Frontend..."
cd ../frontend
if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
fi

# 3. Start Both
echo "⚡ Starting both servers simultaneously..."
npx concurrently \
  -n "backend,frontend" \
  -c "blue,green" \
  "cd ../backend && npm run start:dev" \
  "npm run dev"

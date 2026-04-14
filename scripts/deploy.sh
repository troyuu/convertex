#!/bin/bash
# Convertex Deployment Script
# Run from the project root on the VPS

set -e

APP_DIR="/var/www/convertex"

echo "=========================================="
echo "  DEPLOYING CONVERTEX"
echo "=========================================="

cd "$APP_DIR"

# Pull latest code
echo "[1/5] Pulling latest code..."
git pull origin main

# Install dependencies
echo "[2/5] Installing dependencies..."
npm ci

# Run migrations
echo "[3/5] Running database migrations..."
npm run db:migrate

# Build frontend
echo "[4/5] Building frontend..."
npm run build

# Restart PM2 process
echo "[5/5] Restarting application..."
pm2 restart convertex || pm2 start server/src/server.js --name convertex

echo "=========================================="
echo "  DEPLOY COMPLETE"
echo "  Check status: pm2 status"
echo "  Check logs: pm2 logs convertex"
echo "=========================================="

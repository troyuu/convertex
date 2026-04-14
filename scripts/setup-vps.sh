#!/bin/bash
# Convertex VPS Setup Script
# Run as root on a fresh Ubuntu 22.04+ server

set -e

echo "=========================================="
echo "  CONVERTEX VPS SETUP"
echo "=========================================="

# Update system
apt-get update && apt-get upgrade -y

# Install essentials
apt-get install -y curl git build-essential

# Install Node.js 24 LTS
curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Install LibreOffice (headless)
apt-get install -y libreoffice-core libreoffice-writer libreoffice-calc libreoffice-impress --no-install-recommends

# Install Poppler (pdftoppm, pdftotext)
apt-get install -y poppler-utils

# Install Ghostscript
apt-get install -y ghostscript

# Install Puppeteer dependencies (headless Chrome)
apt-get install -y \
  ca-certificates \
  fonts-liberation \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libdrm2 \
  libgbm1 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  wget

# Install Docker (for PostgreSQL)
curl -fsSL https://get.docker.com | sh
systemctl enable docker
systemctl start docker

# Install Docker Compose plugin
apt-get install -y docker-compose-plugin

# Install Nginx
apt-get install -y nginx

# Install Certbot (Let's Encrypt)
apt-get install -y certbot python3-certbot-nginx

# Create app directory
mkdir -p /var/www/convertex
chown -R www-data:www-data /var/www/convertex

# Setup firewall
ufw allow 22
ufw allow 80
ufw allow 443
ufw --force enable

echo "=========================================="
echo "  SETUP COMPLETE"
echo ""
echo "  Next steps:"
echo "  1. Clone your repo to /var/www/convertex"
echo "  2. Copy .env.example to .env and configure"
echo "  3. Run: docker compose up -d"
echo "  4. Run: npm ci && npm run db:migrate && npm run db:seed"
echo "  5. Run: npm run build"
echo "  6. Configure Nginx (see scripts/nginx.conf)"
echo "  7. Run: certbot --nginx -d yourdomain.com"
echo "  8. Run: pm2 start server/src/server.js --name convertex"
echo "  9. Run: pm2 save && pm2 startup"
echo "=========================================="

# Convertex

A retro-themed (90s aesthetic) file conversion web app. Upload, convert, download — no account required. Files are auto-deleted immediately after download. Privacy is a first-class feature.

## Features

- **18 conversion types** — PDF, Word, Excel, PowerPoint, Images, HTML, CSV
- **No sign-up required** — just upload and convert
- **Privacy-first** — files are deleted immediately after download, no file names or content logged
- **Retro UI** — Windows 95 aesthetic with beveled borders, classic web palette, and 90s vibes

### Supported Conversions

| Category | Conversions |
|----------|------------|
| PDF | PDF to Word, Word to PDF, PDF to Image, Image to PDF |
| Documents | Word to Image, Image to Word, Word to HTML, HTML to PDF |
| Spreadsheets | Excel to PDF, PDF to Excel, CSV to Excel, Excel to CSV |
| Presentations | PowerPoint to PDF, PDF to PowerPoint |
| Utilities | Merge PDF, Split PDF, Compress PDF, Compress Image |

## Tech Stack

- **Frontend**: React 19, Vite 6, Tailwind CSS 4, React Router 7
- **Backend**: Express.js 5, Sequelize 6, PostgreSQL 16
- **Conversion**: LibreOffice, Sharp, Poppler, pdf-lib, Tesseract.js, Ghostscript, Mammoth.js, ExcelJS, Puppeteer
- **Monorepo**: npm workspaces (`client/`, `server/`, `shared/`)

## Prerequisites

- **Node.js** 20+ (24 LTS recommended)
- **PostgreSQL** 16
- **LibreOffice** (headless, for document conversions)
- **Poppler** (for `pdftoppm` — PDF to image)
- **Ghostscript** (for PDF compression)

### Installing Prerequisites

**macOS (Homebrew):**
```bash
brew install --cask libreoffice
brew install poppler ghostscript
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install libreoffice-common poppler-utils ghostscript
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/convertex.git
cd convertex
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up PostgreSQL

**Option A: Using Docker**

Copy the example env file and set your password:
```bash
cp .env.example .env
# Edit .env and set POSTGRES_PASSWORD
```

Start PostgreSQL:
```bash
npm run db:up
```

**Option B: Using a local PostgreSQL instance**

Create the database and user:
```sql
CREATE USER convertex WITH PASSWORD 'your_password';
CREATE DATABASE convertex OWNER convertex;
```

### 4. Configure the server environment

```bash
cp server/.env.example server/.env
```

Edit `server/.env` and update the `DATABASE_URL` with your credentials:
```
DATABASE_URL=postgresql://convertex:your_password@localhost:5432/convertex
```

### 5. Run database migrations and seed

```bash
npm run db:migrate
npm run db:seed
```

### 6. Start the development servers

```bash
npm run dev
```

This starts both the frontend (Vite on http://localhost:5173) and backend (Express on http://localhost:5000) concurrently.

## Project Structure

```
convertex/
├── client/                # React frontend
│   └── src/
│       ├── components/    # UI, layout, and feature components
│       ├── pages/         # Route pages
│       ├── hooks/         # Custom React hooks
│       ├── services/      # API service layer
│       └── config/        # Routes and app config
├── server/                # Express backend
│   └── src/
│       ├── config/        # Database and environment config
│       ├── models/        # Sequelize models
│       ├── migrations/    # Database migrations
│       ├── routes/        # API routes
│       ├── controllers/   # Request handlers
│       ├── services/
│       │   └── converters/  # 18 converter classes
│       ├── middleware/    # Express middleware
│       └── jobs/          # Cron jobs (temp file cleanup)
├── shared/                # Shared constants
├── docker-compose.yml     # PostgreSQL container
└── package.json           # Workspace root
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start client + server concurrently |
| `npm run dev:client` | Start Vite dev server only |
| `npm run dev:server` | Start Express dev server only |
| `npm run build` | Build client for production |
| `npm run start` | Start production server |
| `npm run db:up` | Start PostgreSQL via Docker |
| `npm run db:down` | Stop PostgreSQL container |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed initial data |
| `npm run db:reset` | Reset DB (undo all, migrate, seed) |

## Privacy

- Files are deleted immediately after download
- A cron job sweeps temp files every 10 minutes (30-minute max age)
- No file names or content are ever logged
- IP addresses are stored as SHA-256 hashes only
- No cloud storage — files never leave the server
- No user accounts or tracking

## License

MIT

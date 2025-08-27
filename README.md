# Tugas

A simple web application to manage team tasks and projects using Next.js, MariaDB and Pico CSS.

## Requirements

- Node.js
- MariaDB server

## Setup

1. Install dependencies (requires internet access):
   ```bash
   npm install
   ```
   _Note: Installation may fail in environments without network access._

2. Copy the provided example environment file and edit it with your settings:
   ```bash
   cp .env.example .env
   ```
   The following variables are available:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASS`
   - `DB_NAME`
   - `PORT`

3. Run the development server:
   ```bash
   npm run dev
   ```
   The application listens on port `3000` by default.

4. Build for production:
   ```bash
   npm run build
   npm start
   ```

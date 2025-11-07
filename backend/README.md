# Friday Picker Backend

Express + TypeScript + PostgreSQL backend API for Friday Picker.

## Development

```bash
npm install
npm run dev
```

Server runs on `http://localhost:3001`

## Production

```bash
npm run build
npm start
```

## Environment Variables

### Required Database Configuration

**Option 1: Use DATABASE_URL (recommended)**
```env
DATABASE_URL=postgresql://user:password@host:port/database
```

**Option 2: Use individual variables**
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=friday_user
DB_PASSWORD=friday_password
DB_NAME=friday_picker
```

### Server Configuration
- `PORT` - Server port (default: 3001)

## Database

PostgreSQL database is required. Schema is initialized on first run via `init.sql`.

For local development, you can use Docker Compose:
```bash
docker-compose -f docker-compose.dev.yml up -d postgres
```

## Scheduled Jobs

- **Weekly Reset**: Every Saturday at 12:00 (clears votes & attendance)
  - Configured in `src/server.ts` using node-cron

## API Documentation

See main README.md for full API documentation.


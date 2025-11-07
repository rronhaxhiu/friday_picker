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

**DATABASE_URL connection string (required)**
```env
DATABASE_URL=postgresql://user:password@host:port/database
```

Examples:
- Local: `postgresql://friday_user:friday_password@localhost:5432/friday_picker`
- Docker: `postgresql://friday_user:friday_password@postgres:5432/friday_picker`
- Neon: `postgresql://neondb_owner:**@ep-bitter-credit-ag2xg2do-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
- Production: `postgresql://user:password@db.example.com:5432/friday_picker`

The connection string fully supports query parameters (e.g., `?sslmode=require&channel_binding=require`) and special characters in passwords.

**Note:** `DATABASE_URL` is required. The application will fail to start if it's not set.

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


# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

Open a terminal in the project root:

```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

Or use the shortcut:

```bash
npm run install:all
```

## Step 2: Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your database configuration. You must use a connection string:

```env
DATABASE_URL=postgresql://friday_user:friday_password@localhost:5432/friday_picker
```

For Docker environments, use:
```env
DATABASE_URL=postgresql://friday_user:friday_password@postgres:5432/friday_picker
```

**Note:** `DATABASE_URL` is required. The application will fail to start if it's not set.

## Step 3: Start the Database (if using Docker)

If you're using Docker for PostgreSQL:

```bash
docker-compose -f docker-compose.dev.yml up -d postgres
```

## Step 4: Start the App

### Option A: Run Both at Once (Recommended)

Install concurrently first (if not already):

```bash
npm install
```

Then run:

```bash
npm run dev
```

This starts both backend (port 3001) and frontend (port 3000) simultaneously.

### Option B: Run Separately

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

## Step 3: Open Your Browser

Navigate to: `http://localhost:3000`

## Step 4: Start Using!

1. **Select your name** from the list
2. **Mark attendance** - Are you coming this Friday?
3. **Vote** for activities you like
4. **Add suggestions** if you have new ideas
5. **Submit votes**
6. **View results** on the leaderboard

## Customization

### Change the Friend List

Edit `backend/src/config.ts`:

```typescript
export const USERS = [
  "Alice",
  "Bob",
  "Charlie",
  // ... add your friends
];
```

Then restart the backend.

### Change Reset Schedule

Edit `backend/src/server.ts`:

```typescript
// Current: Saturday at 12:00
cron.schedule('0 12 * * 6', () => {
  resetWeeklyData();
});
```

## Troubleshooting

**"Port already in use"**
- Kill the process using the port or change it in `backend/src/config.ts`

**"Cannot connect to backend"**
- Make sure backend is running on port 3001
- Check if proxy is configured in `frontend/vite.config.ts`

**Database errors**
- Make sure PostgreSQL is running
- Check your `.env` file has correct database credentials
- For Docker: `docker-compose -f docker-compose.dev.yml up -d postgres`

## Need Help?

See the main `README.md` for comprehensive documentation.


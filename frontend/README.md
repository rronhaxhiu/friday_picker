# Friday Picker Frontend

React + TypeScript + Tailwind CSS frontend for Friday Picker.

## Development

```bash
npm install
npm run dev
```

App runs on `http://localhost:3000`

## Production Build

```bash
npm run build
```

Output in `dist/` directory.

## Project Structure

- `/src/pages/` - Main page components
  - `UserSelect.tsx` - User selection page
  - `Dashboard.tsx` - Voting dashboard
  - `Results.tsx` - Results & leaderboard
- `/src/lib/` - Utilities
  - `api.ts` - API client
  - `storage.ts` - LocalStorage helpers
- `/src/App.tsx` - Main app with routing
- `/src/main.tsx` - Entry point

## Configuration

Backend API URL is configured via environment variables:

### Development
- `VITE_BACKEND_URL` - Backend URL for Vite dev server proxy (defaults to `http://localhost:3001`)
- The dev server proxies `/api` requests to the backend URL

### Production Build
- `VITE_API_URL` - Full backend API URL (e.g., `http://localhost:3001` or `https://api.example.com`)
- If not set, defaults to `/api` (useful when using nginx proxy in Docker)

### Environment Variables
Create a `.env` file in the `frontend` directory:

```env
# For development: Backend URL for Vite proxy
VITE_BACKEND_URL=http://localhost:3001

# For production builds: Full backend API URL
# Leave empty to use /api (for nginx proxy scenarios)
VITE_API_URL=
```


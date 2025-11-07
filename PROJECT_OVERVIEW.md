# 📋 Project Overview

## Friday Picker - Complete Architecture

A production-ready webapp for 7 friends to democratically decide their Friday plans using approval voting.

---

## 🗂️ Project Structure

```
friday_picker/
│
├── 📄 README.md                 # Main documentation
├── 📄 SETUP.md                  # Quick setup guide
├── 📄 FEATURES.md               # Feature list & highlights
├── 📄 PROJECT_OVERVIEW.md       # This file
├── 📄 package.json              # Root scripts (dev, build)
├── 📄 .gitignore                # Git ignore rules
│
├── 🔧 backend/                  # Express API Server
│   ├── src/
│   │   ├── config.ts           # User configuration
│   │   ├── db.ts               # Database logic & queries
│   │   ├── server.ts           # Express server & routes
│   │   └── seed.ts             # Demo data seeder
│   ├── data/                   # SQLite database (auto-created)
│   ├── package.json            # Backend dependencies
│   ├── tsconfig.json           # TypeScript config
│   ├── vercel.json             # Vercel deployment config
│   └── README.md               # Backend docs
│
└── 🎨 frontend/                 # React SPA
    ├── src/
    │   ├── pages/
    │   │   ├── UserSelect.tsx  # Page 1: Choose your name
    │   │   ├── Dashboard.tsx   # Page 2: Vote & suggest
    │   │   └── Results.tsx     # Page 3: Leaderboard
    │   ├── lib/
    │   │   ├── api.ts          # API client (axios)
    │   │   └── storage.ts      # localStorage utilities
    │   ├── App.tsx             # Router setup
    │   ├── main.tsx            # React entry point
    │   └── index.css           # Tailwind imports
    ├── public/
    │   └── friday.svg          # App icon
    ├── package.json            # Frontend dependencies
    ├── vite.config.ts          # Vite configuration
    ├── tailwind.config.js      # Tailwind theme
    ├── tsconfig.json           # TypeScript config
    ├── vercel.json             # Vercel deployment config
    └── README.md               # Frontend docs
```

---

## 🏗️ Architecture

### Data Flow

```
User Browser
    │
    ├─→ User Selection (localStorage)
    │
    ├─→ React Frontend (Port 3000)
    │       │
    │       ├─→ User Select Page
    │       ├─→ Dashboard (Voting)
    │       └─→ Results (Leaderboard)
    │
    └─→ Express API (Port 3001)
            │
            ├─→ REST Endpoints
            │   ├─ GET  /api/users
            │   ├─ GET  /api/attendance
            │   ├─ POST /api/attendance
            │   ├─ GET  /api/options
            │   ├─ POST /api/options
            │   ├─ GET  /api/votes/:userId
            │   ├─ POST /api/votes
            │   └─ POST /api/reset
            │
            └─→ SQLite Database
                ├─ users (7 predefined)
                ├─ weeks (auto-created)
                ├─ user_attendance
                ├─ options
                └─ votes
```

---

## 🗄️ Database Schema

### Tables

#### `users`
- `id` (TEXT, PK) - User identifier (lowercase name)
- `name` (TEXT, UNIQUE) - Display name
- `created_at` (TEXT) - Timestamp

#### `weeks`
- `id` (TEXT, PK) - Format: "YYYY-WXX" (e.g., "2025-W45")
- `start_date` (TEXT) - ISO date string
- `created_at` (TEXT) - Timestamp

#### `user_attendance`
- `user_id` (TEXT, FK → users)
- `week_id` (TEXT, FK → weeks)
- `is_attending` (BOOLEAN)
- *Composite PK: (user_id, week_id)*

#### `options`
- `id` (TEXT, PK) - Unique identifier
- `name` (TEXT) - Activity name
- `added_by` (TEXT, FK → users)
- `week_id` (TEXT, FK → weeks)
- `created_at` (TEXT) - Timestamp

#### `votes`
- `user_id` (TEXT, FK → users)
- `option_id` (TEXT, FK → options)
- `week_id` (TEXT, FK → weeks)
- `created_at` (TEXT) - Timestamp
- *Composite PK: (user_id, option_id, week_id)*

### Relationships

```
users ──┬─→ user_attendance
        ├─→ options (added_by)
        └─→ votes

weeks ──┬─→ user_attendance
        ├─→ options
        └─→ votes

options ─→ votes
```

---

## 🚀 API Reference

### Users

**GET /api/users**
- Returns all 7 predefined users
- Response: `Array<{ id: string, name: string }>`

**GET /api/health**
- Health check + current week
- Response: `{ status: "ok", week: "2025-W45" }`

### Attendance

**GET /api/attendance**
- Returns attendance for current week
- Response:
  ```json
  {
    "weekId": "2025-W45",
    "attendance": [
      { "id": "rron", "name": "Rron", "is_attending": 1 },
      ...
    ]
  }
  ```

**POST /api/attendance**
- Update user's attendance
- Body: `{ "userId": "rron", "isAttending": true }`
- Response: `{ "success": true, "weekId": "...", ... }`

### Options

**GET /api/options**
- Returns all options for current week with vote counts
- Response:
  ```json
  {
    "weekId": "2025-W45",
    "options": [
      {
        "id": "...",
        "name": "Bowling 🎳",
        "added_by": "rron",
        "added_by_name": "Rron",
        "vote_count": 3,
        "total_attending": 5
      },
      ...
    ]
  }
  ```

**POST /api/options**
- Add new activity option
- Body: `{ "name": "Bowling 🎳", "addedBy": "rron" }`
- Response: `{ "success": true, "option": {...} }`

### Votes

**GET /api/votes/:userId**
- Get user's current votes
- Response: `{ "weekId": "...", "userId": "...", "votes": ["opt1", "opt2"] }`

**POST /api/votes**
- Submit/update user's votes
- Body: `{ "userId": "rron", "optionIds": ["opt1", "opt2"] }`
- Response: `{ "success": true, ... }`

### Admin

**POST /api/reset**
- Manually trigger weekly reset
- Clears votes & attendance, keeps options
- Response: `{ "success": true, "message": "..." }`

---

## ⏰ Scheduled Tasks

### Weekly Reset (Saturday 12:00)

**What it does:**
1. Clears all votes for current week
2. Clears all attendance for current week
3. Keeps options (they carry over)
4. Keeps user data
5. Keeps week records

**Implementation:**
```typescript
// backend/src/server.ts
cron.schedule('0 12 * * 6', () => {
  resetWeeklyData();
});
```

**Cron syntax:**
- `0` = minute (0)
- `12` = hour (12 PM)
- `*` = any day of month
- `*` = any month
- `6` = day of week (Saturday, 0=Sunday)

---

## 🎨 Frontend Components

### Page: UserSelect

**Location:** `frontend/src/pages/UserSelect.tsx`

**Purpose:** Initial user identification

**Features:**
- Fetches 7 users from API
- Displays as clickable cards
- Stores selection in localStorage
- Navigates to dashboard on selection
- Link to view results without selecting

**State:**
- `users: User[]` - List of all users
- `loading: boolean` - Loading state

### Page: Dashboard

**Location:** `frontend/src/pages/Dashboard.tsx`

**Purpose:** Main voting interface

**Features:**
- Attendance toggle (Yes/No)
- List all options with checkboxes
- Show vote counts & percentages
- Add new option input
- Submit votes button
- Switch user button
- Link to results

**State:**
- `isAttending: boolean` - User's attendance
- `options: Option[]` - All activity options
- `selectedOptions: Set<string>` - Checked options
- `newOptionName: string` - New option input
- `hasVoted: boolean` - Whether user has voted
- `loading: boolean` - Loading state

### Page: Results

**Location:** `frontend/src/pages/Results.tsx`

**Purpose:** Live leaderboard & results

**Features:**
- Winner announcement (top voted)
- Full leaderboard with rankings
- Vote counts & approval percentages
- Progress bars for each option
- Attendance list (who's coming)
- Auto-refresh every 10 seconds
- Links back to home & voting

**State:**
- `options: Option[]` - Sorted by votes
- `attendance: Attendance[]` - All users
- `loading: boolean` - Loading state

---

## 🎯 Key Design Decisions

### Why SQLite?
- Zero configuration
- No separate database server
- Perfect for small groups
- Easy to backup (single file)
- Synchronous API = simpler code

### Why localStorage for users?
- No authentication needed
- Instant "login"
- Persists between sessions
- Users can switch anytime
- Privacy-friendly (no tracking)

### Why approval voting?
- Vote for multiple options
- No "wasted votes"
- Better consensus than plurality
- More democratic than ranked choice
- Simple to understand and use

### Why weekly reset?
- Keeps data fresh
- Prevents clutter
- Forces active participation
- Matches the "Friday" theme
- Automatic = no admin work

### Why TypeScript everywhere?
- Type safety end-to-end
- Better IDE support
- Fewer runtime errors
- Self-documenting code
- Easier refactoring

---

## 🔧 Configuration

### Change Users

**File:** `backend/src/config.ts`

```typescript
export const USERS = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Eve",
  "Frank",
  "Grace"
];
```

Restart backend after changes.

### Change Port

**Backend:** `backend/src/config.ts`
```typescript
export const PORT = process.env.PORT || 3001;
```

**Frontend proxy:** `frontend/vite.config.ts`
```typescript
proxy: {
  '/api': {
    target: 'http://localhost:3001',
    ...
  }
}
```

### Change Reset Schedule

**File:** `backend/src/server.ts`

```typescript
// Examples:
cron.schedule('0 12 * * 6', ...)  // Sat 12:00
cron.schedule('0 0 * * 1', ...)   // Mon 00:00
cron.schedule('0 18 * * 5', ...)  // Fri 18:00
```

---

## 📦 Dependencies

### Backend
- `express` - Web framework
- `cors` - CORS middleware
- `better-sqlite3` - SQLite driver
- `node-cron` - Task scheduler
- `typescript` - Language
- `tsx` - TypeScript executor

### Frontend
- `react` - UI framework
- `react-dom` - React renderer
- `react-router-dom` - Routing
- `axios` - HTTP client
- `typescript` - Language
- `vite` - Build tool
- `tailwindcss` - CSS framework

---

## 🚢 Deployment

### Frontend → Vercel

1. Push to GitHub
2. Import in Vercel
3. Build command: `cd frontend && npm install && npm run build`
4. Output directory: `frontend/dist`
5. Set environment variable: `VITE_API_URL=<backend-url>`

### Backend → Render

1. Push to GitHub
2. Create Web Service
3. Build command: `cd backend && npm install && npm run build`
4. Start command: `cd backend && npm start`
5. Set environment variable: `PORT=10000` (or Render's default)

**Note:** SQLite file persists on disk. For production, consider:
- Persistent storage volume
- Regular backups
- Or migrate to PostgreSQL/MySQL

---

## 🧪 Testing

### Run with Demo Data

```bash
cd backend
npm run seed
npm run dev
```

This adds:
- 4 demo options
- 5 attending, 2 not attending
- 5 sets of votes

### Manual Testing Checklist

- [ ] Select user → navigates to dashboard
- [ ] Toggle attendance → updates immediately
- [ ] Check options → updates selection
- [ ] Add new option → appears in list
- [ ] Submit votes → shows success message
- [ ] View results → shows winner & leaderboard
- [ ] Refresh page → user selection persists
- [ ] Switch user → clears selection
- [ ] Multiple users voting → results update
- [ ] Reset endpoint → clears votes

---

## 🐛 Common Issues

### Port already in use
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <pid> /F

# Mac/Linux
lsof -ti:3001 | xargs kill
```

### Database locked
- Close all instances of the app
- Delete `backend/data/friday-picker.db`
- Restart backend

### CORS errors
- Ensure backend is running
- Check `cors()` middleware in `server.ts`
- Verify proxy in `vite.config.ts`

### Votes not persisting
- Check browser console for errors
- Verify backend logs
- Ensure at least one option is selected
- Check database with SQLite viewer

---

## 📈 Future Enhancements

See `FEATURES.md` for detailed ideas including:
- Email/push notifications
- Historical analytics
- Location/venue integration
- Comments on options
- Image uploads
- Multi-week planning
- Calendar sync

---

## 📝 License

MIT License - Free to use and modify

---

**Built with ❤️ for making Friday decisions easier**


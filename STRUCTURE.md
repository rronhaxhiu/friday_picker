# 📂 Complete Project Structure

Visual representation of all files and directories in Friday Picker.

```
friday_picker/
│
├── 📄 README.md                      # Main documentation (comprehensive)
├── 📄 SETUP.md                       # Detailed setup guide
├── 📄 QUICK_START.md                 # 3-minute quick start
├── 📄 FEATURES.md                    # Feature highlights & ideas
├── 📄 PROJECT_OVERVIEW.md            # Architecture deep-dive
├── 📄 VISUAL_GUIDE.md                # UI walkthrough with ASCII art
├── 📄 SUMMARY.md                     # Project delivery summary
├── 📄 STRUCTURE.md                   # This file
├── 📄 package.json                   # Root scripts (dev, build, install:all)
├── 📄 .gitignore                     # Git ignore rules (root)
│
├── 🔧 backend/                       # Express + TypeScript + SQLite
│   │
│   ├── 📄 package.json               # Backend dependencies
│   ├── 📄 tsconfig.json              # TypeScript configuration
│   ├── 📄 vercel.json                # Vercel deployment config
│   ├── 📄 README.md                  # Backend-specific docs
│   ├── 📄 .gitignore                 # Backend ignore rules
│   │
│   ├── 📁 src/                       # Source code
│   │   ├── 📄 config.ts              # User configuration (7 friends)
│   │   ├── 📄 db.ts                  # Database logic & queries (300+ lines)
│   │   ├── 📄 server.ts              # Express server & API routes (180+ lines)
│   │   └── 📄 seed.ts                # Demo data seeder (optional)
│   │
│   ├── 📁 data/                      # Database storage (auto-created)
│   │   └── friday-picker.db          # SQLite database (created on first run)
│   │
│   └── 📁 dist/                      # Compiled JavaScript (after build)
│       └── *.js                      # Compiled files
│
├── 🎨 frontend/                      # React + TypeScript + Tailwind
│   │
│   ├── 📄 package.json               # Frontend dependencies
│   ├── 📄 tsconfig.json              # TypeScript configuration
│   ├── 📄 tsconfig.node.json         # TypeScript config for Vite
│   ├── 📄 vite.config.ts             # Vite dev server & build config
│   ├── 📄 tailwind.config.js         # Tailwind CSS theme
│   ├── 📄 postcss.config.js          # PostCSS configuration
│   ├── 📄 vercel.json                # Vercel deployment config
│   ├── 📄 index.html                 # HTML entry point
│   ├── 📄 README.md                  # Frontend-specific docs
│   ├── 📄 .gitignore                 # Frontend ignore rules
│   │
│   ├── 📁 public/                    # Static assets
│   │   └── 📄 friday.svg             # App icon (blue gradient with emoji)
│   │
│   ├── 📁 src/                       # Source code
│   │   │
│   │   ├── 📄 main.tsx               # React entry point
│   │   ├── 📄 App.tsx                # Main app with React Router
│   │   ├── 📄 index.css              # Tailwind CSS imports & globals
│   │   │
│   │   ├── 📁 lib/                   # Utilities
│   │   │   ├── 📄 api.ts             # API client (axios + types)
│   │   │   └── 📄 storage.ts         # localStorage helpers
│   │   │
│   │   └── 📁 pages/                 # Page components
│   │       ├── 📄 UserSelect.tsx     # Page 1: User selection (60 lines)
│   │       ├── 📄 Dashboard.tsx      # Page 2: Voting dashboard (250+ lines)
│   │       └── 📄 Results.tsx        # Page 3: Results & leaderboard (180+ lines)
│   │
│   └── 📁 dist/                      # Built static files (after build)
│       ├── index.html                # Built HTML
│       ├── assets/                   # Bundled JS/CSS
│       │   ├── index-*.js            # JavaScript bundle
│       │   └── index-*.css           # CSS bundle
│       └── friday.svg                # Copied static assets
│
└── 📁 node_modules/                  # Dependencies (after install)
    ├── backend/node_modules/         # Backend dependencies
    └── frontend/node_modules/        # Frontend dependencies
```

---

## 📊 File Count by Category

### Documentation (8 files)
```
✅ README.md
✅ SETUP.md
✅ QUICK_START.md
✅ FEATURES.md
✅ PROJECT_OVERVIEW.md
✅ VISUAL_GUIDE.md
✅ SUMMARY.md
✅ STRUCTURE.md
```

### Backend Source (4 files)
```
✅ src/config.ts      (~10 lines)
✅ src/db.ts          (~300 lines)
✅ src/server.ts      (~180 lines)
✅ src/seed.ts        (~40 lines)
```

### Frontend Source (7 files)
```
✅ src/main.tsx              (~10 lines)
✅ src/App.tsx               (~20 lines)
✅ src/index.css             (~15 lines)
✅ src/lib/api.ts            (~80 lines)
✅ src/lib/storage.ts        (~20 lines)
✅ src/pages/UserSelect.tsx  (~60 lines)
✅ src/pages/Dashboard.tsx   (~250 lines)
✅ src/pages/Results.tsx     (~180 lines)
```

### Configuration (17 files)
```
Backend:
✅ package.json
✅ tsconfig.json
✅ vercel.json
✅ .gitignore
✅ README.md

Frontend:
✅ package.json
✅ tsconfig.json
✅ tsconfig.node.json
✅ vite.config.ts
✅ tailwind.config.js
✅ postcss.config.js
✅ vercel.json
✅ index.html
✅ .gitignore
✅ README.md

Root:
✅ package.json
✅ .gitignore
```

### Assets (1 file)
```
✅ public/friday.svg
```

**Total Files Created: 37 files**

---

## 🗄️ Database Structure

### Tables Created at Runtime

```
users
├── id (TEXT, PRIMARY KEY)
├── name (TEXT, UNIQUE)
└── created_at (TEXT)

weeks
├── id (TEXT, PRIMARY KEY)           # Format: "2025-W45"
├── start_date (TEXT)
└── created_at (TEXT)

user_attendance
├── user_id (TEXT, FK → users.id)
├── week_id (TEXT, FK → weeks.id)
├── is_attending (BOOLEAN)
└── PRIMARY KEY (user_id, week_id)

options
├── id (TEXT, PRIMARY KEY)
├── name (TEXT)
├── added_by (TEXT, FK → users.id)
├── week_id (TEXT, FK → weeks.id)
└── created_at (TEXT)

votes
├── user_id (TEXT, FK → users.id)
├── option_id (TEXT, FK → options.id)
├── week_id (TEXT, FK → weeks.id)
├── created_at (TEXT)
└── PRIMARY KEY (user_id, option_id, week_id)
```

---

## 🔄 Data Flow

```
User Browser
    │
    ├─ localStorage
    │   └─ current_user { id, name }
    │
    ├─ React Frontend (http://localhost:3000)
    │   │
    │   ├─ /                     → UserSelect.tsx
    │   ├─ /dashboard            → Dashboard.tsx
    │   └─ /results              → Results.tsx
    │
    └─ Express API (http://localhost:3001)
        │
        ├─ /api/users            → getAllUsers()
        ├─ /api/attendance       → getUserAttendance()
        ├─ /api/options          → getOptions()
        ├─ /api/votes/:userId    → getUserVotes()
        └─ /api/votes            → submitVotes()
            │
            └─ SQLite Database (data/friday-picker.db)
                │
                ├─ users table
                ├─ weeks table
                ├─ user_attendance table
                ├─ options table
                └─ votes table
```

---

## 📦 Dependencies Installed

### Backend Dependencies
```json
{
  "express": "Web framework",
  "cors": "CORS middleware",
  "better-sqlite3": "SQLite driver",
  "node-cron": "Scheduled tasks"
}
```

### Backend Dev Dependencies
```json
{
  "@types/express": "Express types",
  "@types/cors": "CORS types",
  "@types/better-sqlite3": "SQLite types",
  "@types/node": "Node types",
  "@types/node-cron": "Cron types",
  "typescript": "TypeScript compiler",
  "tsx": "TypeScript executor"
}
```

### Frontend Dependencies
```json
{
  "react": "UI framework",
  "react-dom": "React renderer",
  "react-router-dom": "Routing",
  "axios": "HTTP client"
}
```

### Frontend Dev Dependencies
```json
{
  "@types/react": "React types",
  "@types/react-dom": "React DOM types",
  "@vitejs/plugin-react": "Vite React plugin",
  "autoprefixer": "CSS autoprefixer",
  "postcss": "CSS processor",
  "tailwindcss": "CSS framework",
  "typescript": "TypeScript compiler",
  "vite": "Build tool"
}
```

### Root Dependencies
```json
{
  "concurrently": "Run multiple commands"
}
```

---

## 🎯 Entry Points

### Development
```
Backend:  backend/src/server.ts
Frontend: frontend/src/main.tsx
```

### Production Build
```
Backend:  backend/dist/server.js
Frontend: frontend/dist/index.html
```

### Scripts
```
Root:     npm run dev (runs both)
Backend:  npm run dev (watch mode)
Frontend: npm run dev (vite dev server)
```

---

## 📝 Import/Export Map

### Backend Exports
```typescript
// config.ts
export const USERS: string[]
export const PORT: number

// db.ts
export function initializeDatabase()
export function getCurrentWeekId()
export function ensureCurrentWeek()
export function getAllUsers()
export function getUserAttendance()
export function updateAttendance()
export function getOptions()
export function addOption()
export function getUserVotes()
export function submitVotes()
export function resetWeeklyData()
export default db

// server.ts
(Express app with routes)
```

### Frontend Exports
```typescript
// api.ts
export interface User
export interface Attendance
export interface Option
export const api { ... }

// storage.ts
export const storage {
  getCurrentUser(),
  setCurrentUser(),
  clearCurrentUser()
}

// App.tsx
export default App

// pages/*.tsx
export default UserSelect
export default Dashboard
export default Results
```

---

## 🔗 File Dependencies

### Backend
```
server.ts
  └─ imports
      ├─ config.ts (USERS, PORT)
      └─ db.ts (all database functions)

db.ts
  └─ imports
      └─ config.ts (USERS)

seed.ts
  └─ imports
      └─ db.ts (database functions)
```

### Frontend
```
main.tsx
  └─ imports
      ├─ App.tsx
      └─ index.css

App.tsx
  └─ imports
      ├─ storage.ts (getCurrentUser)
      └─ pages/*.tsx (all pages)

Dashboard.tsx & Results.tsx
  └─ imports
      ├─ api.ts (API client)
      └─ storage.ts (user session)

UserSelect.tsx
  └─ imports
      ├─ api.ts (getUsers)
      └─ storage.ts (setCurrentUser)
```

---

## 🎨 Asset Files

### Icons
- `frontend/public/friday.svg` - Blue gradient circle with 🎉 emoji

### Fonts
- System fonts (no custom fonts)
- Uses native emoji rendering

### Images
- None (all visual elements via CSS/SVG)

---

## ⚙️ Build Artifacts

### After `npm run build`

**Backend:**
```
backend/dist/
├── config.js
├── db.js
├── server.js
└── seed.js
```

**Frontend:**
```
frontend/dist/
├── index.html
├── assets/
│   ├── index-[hash].js      # Bundled JavaScript
│   └── index-[hash].css     # Bundled Tailwind CSS
└── friday.svg               # Copied from public/
```

---

## 🚀 Deployment Structure

### Vercel (Frontend)
```
Build Command: cd frontend && npm install && npm run build
Output Directory: frontend/dist
Root Directory: /
```

### Render/Railway (Backend)
```
Build Command: cd backend && npm install && npm run build
Start Command: cd backend && npm start
Root Directory: /
```

---

**This structure represents a complete, production-ready web application!** 🎉


# Friday Picker 🎉

A minimal, production-ready webapp where a fixed group of 7 friends can decide what to do each Friday.

## 🧠 Concept

Each week, friends can:
- **Identify themselves** from a predefined list (no registration needed)
- **Mark attendance** for this Friday
- **View activity options** and see live vote counts
- **Vote** for multiple options they'd enjoy (approval voting)
- **Suggest new options** if none appeal to them
- **View results** on a live leaderboard

The app automatically:
- Counts votes per option and tracks approval percentages
- Shows results on the homepage in a leaderboard
- **Auto-resets every Saturday at 12:00** (clears votes & attendance, keeps options)

## 🧩 Features

✅ **Predefined users**: 7 friends hardcoded in config  
✅ **Session identification**: Pick your name, stored in localStorage  
✅ **Attendance toggle**: "Are you coming this Friday?" (Yes/No)  
✅ **Options list**: View all current activity options  
✅ **Voting**: Select multiple checkboxes (approval voting)  
✅ **Add new option**: Input field for custom suggestions  
✅ **Result logic**: Highest voted option = winner, live vote counts  
✅ **Admin auto-reset**: Every Saturday at 12:00 (via cron job)  

## 🧱 Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: SQLite (better-sqlite3)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with custom gradient theme
- **Scheduling**: node-cron for weekly resets

## 📁 Project Structure

```
friday_picker/
├── backend/
│   ├── src/
│   │   ├── config.ts          # User configuration
│   │   ├── db.ts              # Database logic
│   │   └── server.ts          # Express API server
│   ├── data/                  # SQLite database storage
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── lib/
│   │   │   ├── api.ts         # API client
│   │   │   └── storage.ts     # LocalStorage utilities
│   │   ├── pages/
│   │   │   ├── UserSelect.tsx # User selection page
│   │   │   ├── Dashboard.tsx  # Main voting page
│   │   │   └── Results.tsx    # Leaderboard page
│   │   ├── App.tsx            # Main app with routing
│   │   ├── main.tsx           # Entry point
│   │   └── index.css          # Tailwind styles
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Docker** and **Docker Compose**
- That's it!

### Installation

**Option 1: Production Mode (Docker)**

```bash
# Start everything with one command
docker-compose up -d
```

The app will be available at `http://localhost:3000`

**Option 2: Development Mode**

```bash
# Start database only
docker-compose -f docker-compose.dev.yml up -d

# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

The frontend will be on `http://localhost:3000` and backend on `http://localhost:3001`

### Using the App

1. Open your browser to `http://localhost:3000`
2. Select your name from the list
3. Mark if you're coming this Friday
4. Vote for options you like
5. Optionally suggest new options
6. Submit your votes
7. View results on the leaderboard

## 🗃️ Data Models

### User
```typescript
{
  id: string,
  name: string
}
```

### Option
```typescript
{
  id: string,
  name: string,
  added_by: string,
  added_by_name: string,
  vote_count: number,
  total_attending: number
}
```

### Attendance
```typescript
{
  user_id: string,
  week_id: string,
  is_attending: boolean
}
```

### Vote
```typescript
{
  user_id: string,
  option_id: string,
  week_id: string
}
```

## ⚙️ Configuration

### Changing the Friend List

Edit `backend/src/config.ts`:

```typescript
export const USERS = [
  "Rron",
  "Norti",
  "Elira",
  "Klea",
  "Edi",
  "Lira",
  "Doni"
];
```

After changing, restart the backend and the database will auto-update.

### Changing the Reset Schedule

Edit `backend/src/server.ts`:

```typescript
// Format: 'minute hour day month dayOfWeek'
// Current: Every Saturday at 12:00
cron.schedule('0 12 * * 6', () => {
  resetWeeklyData();
});
```

Examples:
- `'0 12 * * 6'` - Saturday at 12:00
- `'0 0 * * 1'` - Monday at midnight
- `'30 18 * * 5'` - Friday at 6:30 PM

## 🧪 Testing Manual Reset

You can manually trigger a reset without waiting for Saturday:

```bash
curl -X POST http://localhost:3001/api/reset
```

Or use the API endpoint from your browser:
```
POST http://localhost:3001/api/reset
```

## 📊 API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/health` - Health check

### Attendance
- `GET /api/attendance` - Get current week attendance
- `POST /api/attendance` - Update user attendance
  ```json
  {
    "userId": "rron",
    "isAttending": true
  }
  ```

### Options
- `GET /api/options` - Get all options for current week
- `POST /api/options` - Add new option
  ```json
  {
    "name": "Bowling 🎳",
    "addedBy": "rron"
  }
  ```

### Votes
- `GET /api/votes/:userId` - Get user's votes
- `POST /api/votes` - Submit votes
  ```json
  {
    "userId": "rron",
    "optionIds": ["option1", "option2"]
  }
  ```

### Admin
- `POST /api/reset` - Manually reset weekly data

## 🎨 Design Highlights

- **Mobile-first responsive design**
- **Beautiful gradient backgrounds**
- **Smooth animations and transitions**
- **Emoji-enriched friendly interface**
- **Real-time vote percentages**
- **Live auto-refreshing results (every 10s)**

## 🏗️ Building for Production

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
```

The build output will be in `frontend/dist/`. Deploy this to Vercel, Netlify, or any static hosting service.

### Environment Variables

For production, set:

```bash
# Backend
PORT=3001  # or your preferred port

# Frontend (in vite.config.ts or .env)
VITE_API_URL=https://your-backend-api.com
```

## 🚢 Deployment Options

### Frontend (Vercel)
1. Connect your GitHub repo to Vercel
2. Set build command: `cd frontend && npm install && npm run build`
3. Set output directory: `frontend/dist`
4. Deploy!

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repo
3. Set build command: `cd backend && npm install && npm run build`
4. Set start command: `cd backend && npm start`
5. Deploy!

### Backend (Railway/Fly.io)
Similar process - point to the backend directory and set appropriate build/start commands.

## 🔒 Security Notes

- This app is designed for a small, trusted group of friends
- No authentication/authorization implemented
- User selection is stored only in localStorage
- Database is not encrypted
- For public use, consider adding proper authentication

## 🛠️ Troubleshooting

**Database not found error:**
- The `backend/data/` directory is created automatically
- Make sure you're running `npm run dev` from the `backend` directory

**Port already in use:**
- Change the port in `backend/src/config.ts`
- Update the proxy in `frontend/vite.config.ts`

**Frontend can't connect to backend:**
- Ensure backend is running on port 3001
- Check browser console for CORS errors
- Verify proxy settings in `vite.config.ts`

**Votes not saving:**
- Check backend logs for errors
- Ensure you've selected at least one option
- Try refreshing the page

## 📝 License

MIT License - feel free to use and modify for your friend group!

## 🤝 Contributing

This is a personal project, but feel free to fork and adapt for your own use!

---

Made with ❤️ for Friday planning


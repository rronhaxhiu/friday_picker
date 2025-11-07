# 🎉 Welcome to Friday Picker!

```
███████╗██████╗ ██╗██████╗  █████╗ ██╗   ██╗
██╔════╝██╔══██╗██║██╔══██╗██╔══██╗╚██╗ ██╔╝
█████╗  ██████╔╝██║██║  ██║███████║ ╚████╔╝ 
██╔══╝  ██╔══██╗██║██║  ██║██╔══██║  ╚██╔╝  
██║     ██║  ██║██║██████╔╝██║  ██║   ██║   
╚═╝     ╚═╝  ╚═╝╚═╝╚═════╝ ╚═╝  ╚═╝   ╚═╝   
                                             
██████╗ ██╗ ██████╗██╗  ██╗███████╗██████╗  
██╔══██╗██║██╔════╝██║ ██╔╝██╔════╝██╔══██╗ 
██████╔╝██║██║     █████╔╝ █████╗  ██████╔╝ 
██╔═══╝ ██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗ 
██║     ██║╚██████╗██║  ██╗███████╗██║  ██║ 
╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ 
```

## 🎯 What is this?

**Friday Picker** is a web app that helps your friend group democratically decide what to do each Friday!

✨ **No accounts** • ✨ **No passwords** • ✨ **Just votes**

---

## ⚡ Quick Start (3 minutes)

### 1. Install
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Run
```bash
# Option A: Run both at once
npm run dev

# Option B: Run separately
# Terminal 1: cd backend && npm run dev
# Terminal 2: cd frontend && npm run dev
```

### 3. Open
Visit **http://localhost:3000** 🚀

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| 📖 [README.md](README.md) | Complete documentation |
| ⚡ [QUICK_START.md](QUICK_START.md) | Get running in 3 minutes |
| 🛠️ [SETUP.md](SETUP.md) | Detailed setup guide |
| ✨ [FEATURES.md](FEATURES.md) | Feature highlights |
| 🏗️ [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) | Architecture deep-dive |
| 🎨 [VISUAL_GUIDE.md](VISUAL_GUIDE.md) | UI walkthrough |
| 📦 [SUMMARY.md](SUMMARY.md) | Project delivery summary |
| 📂 [STRUCTURE.md](STRUCTURE.md) | Complete file structure |

---

## 🎮 How It Works

```
1. Pick Your Name
   ↓
2. Mark Attendance (Are you coming?)
   ↓
3. Vote for Activities
   ↓
4. Suggest New Ideas
   ↓
5. See Results!
```

Every **Saturday at 12:00**, votes reset automatically for the next week!

---

## 🧩 What's Included?

✅ **Backend API** (Express + TypeScript + SQLite)  
✅ **Frontend App** (React + TypeScript + Tailwind)  
✅ **3 Pages** (User Select, Dashboard, Results)  
✅ **9 API Endpoints** (Users, Attendance, Options, Votes)  
✅ **Auto-Reset** (Every Saturday)  
✅ **Live Results** (Auto-refresh every 10s)  
✅ **Deployment Configs** (Vercel ready)  
✅ **Demo Data** (Seed script included)  

---

## 🎨 Features

🗳️ **Approval Voting** - Vote for multiple options  
📊 **Live Leaderboard** - See results in real-time  
✨ **Beautiful UI** - Tailwind CSS with gradients  
📱 **Mobile First** - Works great on phones  
⚙️ **Auto-Reset** - Every Saturday at 12:00  
🎯 **Zero Friction** - No login required  

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Backend | Express + TypeScript |
| Database | SQLite (better-sqlite3) |
| Scheduling | node-cron |
| HTTP Client | Axios |

---

## 📁 Project Structure

```
friday_picker/
├── 📚 Documentation (8 .md files)
├── 🔧 backend/
│   └── src/
│       ├── config.ts    (7 friends)
│       ├── db.ts        (database logic)
│       ├── server.ts    (API routes)
│       └── seed.ts      (demo data)
├── 🎨 frontend/
│   └── src/
│       ├── pages/
│       │   ├── UserSelect.tsx
│       │   ├── Dashboard.tsx
│       │   └── Results.tsx
│       └── lib/
│           ├── api.ts       (API client)
│           └── storage.ts   (localStorage)
└── 📦 package.json (root scripts)
```

---

## 🚀 Common Commands

```bash
# Install everything
npm run install:all

# Run both frontend & backend
npm run dev

# Build for production
npm run build

# Add demo data (backend only)
cd backend && npm run seed
```

---

## 🎯 Customization

### Change the Friend List

Edit `backend/src/config.ts`:
```typescript
export const USERS = [
  "Your",
  "Friend",
  "Names",
  "Go",
  "Here",
  "Seven",
  "Total"
];
```

Then restart the backend!

---

## 🔧 Configuration

| File | Purpose |
|------|---------|
| `backend/src/config.ts` | User names, port |
| `backend/src/server.ts` | Reset schedule (cron) |
| `frontend/vite.config.ts` | API proxy settings |
| `frontend/tailwind.config.js` | Color theme |

---

## 📊 Stats

- **37 Files** created
- **~3,740 Lines** of code + docs
- **9 API Endpoints** implemented
- **3 UI Pages** designed
- **5 Database Tables** structured
- **8 Documentation** guides written

---

## 🎓 Learn More

### New to the Stack?

- [React Docs](https://react.dev/) - UI framework
- [TypeScript Docs](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Express.js](https://expressjs.com/) - Backend framework
- [SQLite](https://www.sqlite.org/) - Database

---

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <pid> /F

# Mac/Linux
lsof -ti:3001 | xargs kill
```

**Can't connect to backend?**
- Make sure backend is running (port 3001)
- Check backend terminal for errors
- Verify proxy in `frontend/vite.config.ts`

**Need more help?**
- Check `README.md` for full docs
- See `SETUP.md` for detailed setup
- Read `PROJECT_OVERVIEW.md` for architecture

---

## 🚢 Ready to Deploy?

See deployment guides in [README.md](README.md#-deployment-options):
- ▲ Vercel (Frontend)
- 🚂 Render (Backend)
- 🚀 Railway (Alternative)

---

## 🎉 Have Fun!

This app is designed to make group decisions **easy**, **fun**, and **democratic**.

Every Friday, your friends can:
- ✅ Mark if they're coming
- 🗳️ Vote on activities
- 💡 Suggest new ideas
- 🏆 See the winning option

**Let the voting begin!** 🎊

---

## 📝 License

MIT License - Free to use and modify!

---

## 💬 Questions?

Check the documentation files listed above, or explore the code!

Everything is well-commented and structured for easy understanding.

---

**Made with ❤️ for making Friday decisions easier**

```
🎉 Happy Friday Planning! 🎉
```


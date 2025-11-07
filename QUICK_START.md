# ⚡ Quick Start - 3 Minutes to Running

Get Friday Picker up and running in 3 simple steps!

---

## Prerequisites

- **Node.js** version 18 or higher ([download here](https://nodejs.org/))
- **npm** (comes with Node.js)

Check your versions:
```bash
node --version  # Should be 18+
npm --version   # Should be 9+
```

---

## Step 1: Install Dependencies (1 minute)

Open a terminal in the project folder and run:

```bash
cd backend
npm install
cd ../frontend
npm install
cd ..
```

Or use the shortcut (requires installing concurrently first):
```bash
npm install        # Install concurrently
npm run install:all
```

---

## Step 2: Start the App (30 seconds)

### Option A: One Command (Recommended)

```bash
npm run dev
```

This starts both backend and frontend together!

### Option B: Two Separate Terminals

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```
✅ Backend running on http://localhost:3001

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
✅ Frontend running on http://localhost:3000

---

## Step 3: Open Your Browser

Navigate to: **http://localhost:3000**

---

## 🎉 You're Ready!

### What to do next:

1. **Pick your name** from the list
2. **Mark if you're coming** this Friday
3. **Vote** for activities you'd enjoy
4. **Add suggestions** for new activities
5. **Submit your votes**
6. **View results** to see the winner!

---

## Optional: Add Demo Data

Want to see the app with some example data?

```bash
cd backend
npm run seed
```

This adds:
- 4 activity options
- Sample attendance (5 coming, 2 not)
- Demo votes from multiple users

Then restart the backend:
```bash
npm run dev
```

---

## Customize for Your Group

Edit the friend list in `backend/src/config.ts`:

```typescript
export const USERS = [
  "Alice",    // Change these names
  "Bob",      // to your actual
  "Charlie",  // friend group!
  "Diana",
  "Eve",
  "Frank",
  "Grace"
];
```

Save the file and restart the backend.

---

## Common Issues

### Port 3001 or 3000 already in use?

**Windows:**
```powershell
netstat -ano | findstr :3001
taskkill /PID <pid> /F
```

**Mac/Linux:**
```bash
lsof -ti:3001 | xargs kill
```

### Can't connect to backend?

1. Make sure backend is running (Terminal 1)
2. Check for errors in the backend terminal
3. Try restarting both frontend and backend

### Votes not saving?

1. Check browser console (F12) for errors
2. Make sure you selected at least one option
3. Check backend terminal for error messages

---

## 📚 More Help

- **Full Documentation:** See `README.md`
- **Setup Guide:** See `SETUP.md`
- **Features List:** See `FEATURES.md`
- **Architecture:** See `PROJECT_OVERVIEW.md`
- **Visual Guide:** See `VISUAL_GUIDE.md`

---

## 🚀 That's It!

You now have a fully functional Friday planning app!

**Next Friday, your friends can:**
- Vote on what to do
- See live results
- Make group decisions democratically

**Every Saturday at 12:00:**
- Votes automatically reset
- Ready for next week's planning

---

**Happy Friday Planning!** 🎉


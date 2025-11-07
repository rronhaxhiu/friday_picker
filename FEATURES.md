# ✨ Features & Highlights

## Core Features

### 1. 👥 User Selection
- **No Registration Required** - Just pick your name from a predefined list
- **7 Friends Hardcoded** - Easy to customize in config
- **Session Persistence** - Uses localStorage to remember who you are

### 2. 📅 Weekly Attendance Tracking
- Simple Yes/No toggle for "Are you coming this Friday?"
- Visual feedback with colored buttons
- Real-time attendance list on results page

### 3. 🗳️ Approval Voting System
- Vote for **multiple options** (not just one!)
- Checkbox-based interface for easy selection
- Submit/Update votes anytime before Friday

### 4. 💡 Option Suggestions
- Anyone can suggest new activities
- Simple text input with instant addition
- Options persist across weeks until manually removed

### 5. 📊 Live Results & Leaderboard
- **Real-time vote counts** with auto-refresh every 10 seconds
- **Percentage approval** calculated from attending members
- **Winner announcement** (highest votes) with trophy display
- Progress bars showing relative popularity
- "Waiting for votes" state when no votes yet

### 6. 🔄 Automatic Weekly Reset
- **Scheduled reset every Saturday at 12:00**
- Clears all votes and attendance
- Keeps options for next week
- Customizable schedule via cron expression

## Technical Highlights

### Frontend
- ⚡ **Vite** - Lightning-fast dev server and build tool
- 🎨 **Tailwind CSS** - Beautiful, responsive design
- 🔄 **React Router** - Smooth client-side navigation
- 💾 **localStorage** - Session persistence without backend auth
- 🎭 **TypeScript** - Type-safe development

### Backend
- 🚀 **Express** - Fast, minimal API server
- 💾 **SQLite** - Zero-config embedded database
- 📅 **node-cron** - Reliable scheduled tasks
- 🔒 **better-sqlite3** - Synchronous, performant database access
- 🎯 **TypeScript** - End-to-end type safety

### Design
- 📱 **Mobile-First** - Optimized for phones
- 🎨 **Gradient Backgrounds** - Modern, colorful aesthetic
- ✨ **Smooth Animations** - Hover effects and transitions
- 😊 **Emoji-Rich** - Friendly, approachable interface
- 🌈 **Color-Coded States** - Green/red for attendance, progress bars for votes

## User Experience

### Minimal Friction
- No login/signup required
- 3-click voting process:
  1. Select name
  2. Check options
  3. Submit
- Instant feedback on all actions

### Real-Time Collaboration
- Multiple friends can vote simultaneously
- Results update automatically
- See who's coming in real-time
- Live vote percentages

### Smart Defaults
- Auto-creates weekly data structure
- Graceful handling of no votes
- Persistent options across resets
- Automatic tie-breaking (first option wins)

## Use Cases

Perfect for:
- 🎉 **Friend Groups** - Decide weekly activities
- 🏢 **Team Events** - Plan team outings
- 👨‍👩‍👧‍👦 **Family Planning** - Weekend activity selection
- 🎓 **Study Groups** - Choose meeting activities
- 🎮 **Gaming Clans** - Decide which game to play

## Future Enhancement Ideas

Could be extended with:
- 📧 Email notifications when voting opens
- 📱 Push notifications for reminders
- 🔐 Optional authentication for larger groups
- 📈 Historical data and analytics
- 🗺️ Location/map integration for venues
- 💬 Comments on options
- 🖼️ Image uploads for activities
- 🏆 Gamification with points/badges
- 📅 Multi-week planning
- 🔗 Calendar integration

## Why It's Great

1. **Zero Barrier to Entry** - No accounts, no emails, no friction
2. **Fast Decision Making** - Everyone votes quickly, result is clear
3. **Democratic** - Everyone's voice counts equally
4. **Flexible** - Approval voting means no "wasted votes"
5. **Low Maintenance** - Auto-resets weekly, no admin needed
6. **Production Ready** - Clean code, TypeScript, proper structure
7. **Easy to Deploy** - Works on Vercel, Render, Railway, etc.
8. **Customizable** - Easy to change friend list and schedule

---

**Built for simplicity, optimized for joy** 🎉


# 📸 Visual Guide

A walkthrough of the Friday Picker user interface.

---

## 🎭 Page 1: User Selection

**URL:** `/`

### Layout

```
┌─────────────────────────────────────────────────┐
│                                                 │
│          Friday Picker 🎉                       │
│                                                 │
│              Who are you?                       │
│                                                 │
│   ┌──────┐  ┌──────┐  ┌──────┐                │
│   │  R   │  │  N   │  │  E   │                │
│   │ Rron │  │Norti │  │Elira │                │
│   └──────┘  └──────┘  └──────┘                │
│                                                 │
│   ┌──────┐  ┌──────┐  ┌──────┐                │
│   │  K   │  │  E   │  │  L   │                │
│   │ Klea │  │ Edi  │  │ Lira │                │
│   └──────┘  └──────┘  └──────┘                │
│                                                 │
│   ┌──────┐                                     │
│   │  D   │                                     │
│   │ Doni │                                     │
│   └──────┘                                     │
│                                                 │
│         View Results 📊                         │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Features
- 7 user cards with initial letters
- Hover effect: scale up & lift shadow
- Click → navigate to dashboard
- "View Results" link at bottom

### Colors
- Background: Blue gradient (light to darker)
- Cards: White with shadow
- Initials: Blue gradient circle
- Hover: Enhanced shadow + slight scale

---

## 🗳️ Page 2: Dashboard (Main Voting Page)

**URL:** `/dashboard`

### Layout

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Hey, Rron! 👋                  [Switch User]   │
│                                                 │
│  Are you coming this Friday?                    │
│  ┌──────────────────┐  ┌──────────────────┐   │
│  │ ✅ Yes, I'm in!  │  │ ❌ Can't make it │   │
│  └──────────────────┘  └──────────────────┘   │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  Vote for what to do this Friday 🗳️            │
│                                                 │
│  ☑️ Bowling 🎳                          75%    │
│     Suggested by Rron • 3 votes                 │
│                                                 │
│  ☐ Pizza Night 🍕                       50%    │
│     Suggested by Norti • 2 votes                │
│                                                 │
│  ☑️ Movie Marathon 🎬                   25%    │
│     Suggested by Elira • 1 vote                 │
│                                                 │
│  ☐ Karaoke 🎤                            0%    │
│     Suggested by Klea • 0 votes                 │
│                                                 │
│  Add your own idea...                           │
│  ┌────────────────────────────┐  ┌──────┐     │
│  │ e.g., Board Games 🎲       │  │ Add  │     │
│  └────────────────────────────┘  └──────┘     │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │          🗳️ Submit Votes                  │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│         View Results & Leaderboard 📊          │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Features

**Header Section:**
- Greeting with user's name
- "Switch User" link (top right)
- Attendance toggle buttons
  - Green when "Yes" selected
  - Red when "No" selected

**Voting Section:**
- Checkbox for each option
- Option name with emoji
- Who suggested it
- Current vote count
- Approval percentage (votes / attending)

**Add Option:**
- Text input with placeholder
- "Add" button (disabled if empty)
- Press Enter to submit

**Submit Button:**
- Full-width gradient button
- Shows "Submit Votes" or "Update Your Votes"
- Disabled if no options selected
- Success alert on submission

### Colors
- Header cards: White background
- Attending Yes: Green
- Attending No: Red
- Option cards: Light gray background
- Checkboxes: Blue when checked
- Submit button: Blue gradient

---

## 🏆 Page 3: Results & Leaderboard

**URL:** `/results`

### Layout

```
┌─────────────────────────────────────────────────┐
│                                                 │
│          This Friday's Plan 🎉                  │
│              5 people coming                    │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │                  🏆                        │ │
│  │                                            │ │
│  │            Bowling 🎳                      │ │
│  │                                            │ │
│  │              3 votes (60%)                 │ │
│  │          Suggested by Rron                 │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  Leaderboard 📊                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ #1  Bowling 🎳           3 votes    60%   │ │
│  │     by Rron                                │ │
│  │     ████████████░░░░░░░░                  │ │
│  └───────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────┐ │
│  │ #2  Pizza Night 🍕       2 votes    40%   │ │
│  │     by Norti                               │ │
│  │     ████████░░░░░░░░░░░░                  │ │
│  └───────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────┐ │
│  │ #3  Movie Marathon 🎬    1 vote     20%   │ │
│  │     by Elira                               │ │
│  │     ████░░░░░░░░░░░░░░░░                  │ │
│  └───────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────┐ │
│  │ #4  Karaoke 🎤           0 votes     0%   │ │
│  │     by Klea                                │ │
│  │     ░░░░░░░░░░░░░░░░░░░░                  │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  Who's Coming? 👥                               │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐    │
│  │✅Rron│ │✅Norti│ │✅Elira│ │❌Klea│ │✅Edi │    │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘    │
│  ┌─────┐ ┌─────┐                              │
│  │✅Lira│ │❌Doni│                              │
│  └─────┘ └─────┘                              │
│                                                 │
│  ┌──────────────┐  ┌──────────────────────┐   │
│  │Back to Home  │  │    Vote Now 🗳️      │   │
│  └──────────────┘  └──────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Features

**Winner Card:**
- Large gradient background (yellow/orange)
- Trophy emoji 🏆
- Activity name
- Vote count and percentage
- Who suggested it
- Shows "Waiting for votes..." if no votes yet

**Leaderboard:**
- Numbered ranking (#1, #2, #3...)
- Option name with emoji
- Who suggested it
- Vote count and approval %
- Progress bar (visual representation)
- Sorted by vote count (descending)

**Attendance Grid:**
- All 7 users in a grid
- Green background = coming ✅
- Gray background = not coming ❌

**Action Buttons:**
- "Back to Home" - white button
- "Vote Now" - blue gradient button

### Auto-Refresh
- Results automatically update every 10 seconds
- No page reload needed
- Live vote counts

### Colors
- Winner card: Yellow/orange gradient
- Leaderboard items: Light gray
- Progress bars: Blue gradient
- Attending: Green
- Not attending: Gray

---

## 🎨 Design System

### Color Palette

**Primary (Blue):**
- 50-100: Very light (backgrounds)
- 400-500: Main blue (buttons, links)
- 600-700: Darker blue (hover states)

**Success (Green):**
- Used for "Yes, I'm coming"
- Attending status

**Danger (Red):**
- Used for "Can't make it"
- Not attending status

**Warning (Yellow/Orange):**
- Winner card gradient
- Celebration colors

### Typography

**Headlines:**
- Large (4xl-6xl): Page titles
- Medium (2xl-3xl): Section headers
- Emojis integrated into text

**Body:**
- Regular (base-lg): Main content
- Small (sm): Metadata (who suggested, vote counts)

### Spacing

**Padding:**
- Cards: 8 (p-8)
- Sections: 4-6 (p-4 to p-6)

**Margins:**
- Between sections: 8 (mb-8)
- Between elements: 4-6 (mb-4 to mb-6)

**Gaps:**
- Button groups: 4 (gap-4)
- Grid items: 3-4 (gap-3 to gap-4)

### Animations

**Hover Effects:**
- Scale: 105% (hover:scale-105)
- Shadow: Lift effect (hover:shadow-2xl)
- Transform: Slight upward (-translate-y-1)

**Transitions:**
- All: 300ms (transition-all duration-300)
- Smooth easing

### Components

**Buttons:**
- Rounded: xl (rounded-xl)
- Padding: 3-4 vertical, 6-8 horizontal
- Font: Semibold
- Hover: Darker color + shadow

**Cards:**
- Rounded: 2xl (rounded-2xl)
- Shadow: lg (shadow-lg)
- Background: White or gradient
- Hover: shadow-2xl

**Input Fields:**
- Rounded: xl (rounded-xl)
- Border: Gray 300
- Focus: Blue ring (focus:ring-2)

**Checkboxes:**
- Size: 5 (w-5 h-5)
- Color: Primary blue
- Rounded: Default

---

## 📱 Responsive Design

### Mobile (< 768px)

- Single column layout
- Cards stack vertically
- User selection: 1 column
- Attendance: 2 columns
- Full-width buttons

### Tablet (768px - 1024px)

- User selection: 2 columns
- Attendance grid: 2-3 columns
- Leaderboard: Full width

### Desktop (> 1024px)

- User selection: 3 columns
- Attendance grid: 4 columns
- Max width: 4xl (896px)
- Centered content

---

## 🎬 User Flow

```
Start
  │
  ├─→ Select User (Page 1)
  │     │
  │     ├─→ "View Results" → Results (Page 3)
  │     │
  │     └─→ Click Name → Dashboard (Page 2)
  │           │
  │           ├─→ Toggle Attendance
  │           ├─→ Select Options
  │           ├─→ Add New Option
  │           ├─→ Submit Votes → Success!
  │           │
  │           ├─→ "View Results" → Results (Page 3)
  │           │
  │           └─→ "Switch User" → User Select (Page 1)
  │
  └─→ Results (Page 3)
        │
        ├─→ "Back to Home" → User Select (Page 1)
        │
        └─→ "Vote Now" → Dashboard (Page 2)
```

---

## 🖼️ Key Visual Elements

### User Cards (Page 1)
- White cards with shadow
- Circular initial badge (gradient)
- Large name text
- Hover: Lift + enhanced shadow + scale

### Attendance Toggle (Page 2)
- Two side-by-side buttons
- Active: Bright color + shadow
- Inactive: Gray + no shadow
- Immediate visual feedback

### Option Checkboxes (Page 2)
- Light gray card background
- Blue checkbox when checked
- Vote count on the right
- Percentage if attending > 0

### Winner Card (Page 3)
- Eye-catching gradient
- Large emoji
- White text
- Celebratory design

### Progress Bars (Page 3)
- Gray background
- Blue gradient fill
- Smooth width transitions
- Visual vote comparison

---

## 🎯 UX Highlights

### Minimal Friction
- No login form
- One click to select user
- Checkboxes for voting (not radio buttons)
- Auto-save on toggle
- Clear success feedback

### Instant Feedback
- Buttons change color immediately
- Success alerts on actions
- Loading states shown
- Error handling with user-friendly messages

### Visual Hierarchy
- Important actions: Large gradient buttons
- Secondary actions: Smaller text links
- Winner: Prominent gradient card
- Leaderboard: Structured ranking

### Accessibility
- High contrast text
- Large clickable areas
- Clear labels
- Keyboard navigation support (native HTML)

---

**Design Philosophy:** Friendly, minimal, and fun! 🎉


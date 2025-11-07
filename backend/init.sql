-- Friday Picker Database Schema for PostgreSQL

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Weeks table
CREATE TABLE IF NOT EXISTS weeks (
    id TEXT PRIMARY KEY,
    start_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User attendance table
CREATE TABLE IF NOT EXISTS user_attendance (
    user_id TEXT NOT NULL,
    week_id TEXT NOT NULL,
    is_attending BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id, week_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (week_id) REFERENCES weeks(id) ON DELETE CASCADE
);

-- Options table
CREATE TABLE IF NOT EXISTS options (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    added_by TEXT NOT NULL,
    week_id TEXT NOT NULL,
    section TEXT DEFAULT 'Activity',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (added_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (week_id) REFERENCES weeks(id) ON DELETE CASCADE
);

-- Votes table
CREATE TABLE IF NOT EXISTS votes (
    user_id TEXT NOT NULL,
    option_id TEXT NOT NULL,
    week_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, option_id, week_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (option_id) REFERENCES options(id) ON DELETE CASCADE,
    FOREIGN KEY (week_id) REFERENCES weeks(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_attendance_week ON user_attendance(week_id);
CREATE INDEX IF NOT EXISTS idx_options_week ON options(week_id);
CREATE INDEX IF NOT EXISTS idx_options_section ON options(section);
CREATE INDEX IF NOT EXISTS idx_votes_week ON votes(week_id);
CREATE INDEX IF NOT EXISTS idx_votes_user ON votes(user_id);
CREATE INDEX IF NOT EXISTS idx_votes_option ON votes(option_id);


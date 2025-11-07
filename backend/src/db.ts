import { Pool } from 'pg';
import { USERS } from './config';
import dotenv from 'dotenv';

dotenv.config();

// Get database configuration from environment variables
function getDatabaseConfig() {
  // Support DATABASE_URL connection string (standard practice)
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
    };
  }

  // Fall back to individual environment variables
  const requiredVars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required database environment variables: ${missingVars.join(', ')}\n` +
      `Either set DATABASE_URL or set all of: ${requiredVars.join(', ')}`
    );
  }

  return {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!, 10),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  };
}

// Create PostgreSQL connection pool
const pool = new Pool(getDatabaseConfig());

// Test connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
});

// Initialize database with users
export async function initializeDatabase() {
  try {
    // Insert predefined users if they don't exist
    for (const name of USERS) {
      await pool.query(
        'INSERT INTO users (id, name) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING',
        [name.toLowerCase(), name]
      );
    }
    console.log('✅ Database initialized with users');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
}

// Get current week ID (format: YYYY-WXX)
export function getCurrentWeekId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const firstDayOfYear = new Date(year, 0, 1);
  const pastDaysOfYear = (now.getTime() - firstDayOfYear.getTime()) / 86400000;
  const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  return `${year}-W${String(weekNumber).padStart(2, '0')}`;
}

// Ensure current week exists
export async function ensureCurrentWeek() {
  const weekId = getCurrentWeekId();
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday

  await pool.query(
    'INSERT INTO weeks (id, start_date) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING',
    [weekId, startOfWeek]
  );

  return weekId;
}

// Get all users
export async function getAllUsers() {
  const result = await pool.query('SELECT * FROM users ORDER BY name');
  return result.rows;
}

// Get user attendance for current week
export async function getUserAttendance(weekId: string) {
  const result = await pool.query(
    `SELECT u.id, u.name, 
     CASE WHEN ua.is_attending THEN 1 ELSE 0 END as is_attending
     FROM users u
     LEFT JOIN user_attendance ua ON u.id = ua.user_id AND ua.week_id = $1
     ORDER BY u.name`,
    [weekId]
  );
  return result.rows;
}

// Update user attendance
export async function updateAttendance(userId: string, weekId: string, isAttending: boolean) {
  await pool.query(
    `INSERT INTO user_attendance (user_id, week_id, is_attending)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, week_id) 
     DO UPDATE SET is_attending = $3`,
    [userId, weekId, isAttending]
  );
}

// Get all options for current week
export async function getOptions(weekId: string) {
  const result = await pool.query(
    `SELECT 
      o.id,
      o.name,
      o.added_by,
      o.section,
      u.name as added_by_name,
      COUNT(DISTINCT v.user_id) as vote_count,
      (SELECT COUNT(DISTINCT ua.user_id) 
       FROM user_attendance ua 
       WHERE ua.week_id = $1 AND ua.is_attending = true) as total_attending
    FROM options o
    LEFT JOIN users u ON o.added_by = u.id
    LEFT JOIN votes v ON o.id = v.option_id AND v.week_id = $1
    WHERE o.week_id = $1
    GROUP BY o.id, u.name
    ORDER BY o.section, o.created_at ASC`,
    [weekId]
  );
  return result.rows;
}

// Add new option
export async function addOption(name: string, addedBy: string, weekId: string, section: string = 'Activity') {
  const id = `${weekId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  await pool.query(
    'INSERT INTO options (id, name, added_by, week_id, section) VALUES ($1, $2, $3, $4, $5)',
    [id, name, addedBy, weekId, section]
  );
  return { id, name, added_by: addedBy, section };
}

// Get user votes for current week
export async function getUserVotes(userId: string, weekId: string) {
  const result = await pool.query(
    'SELECT option_id FROM votes WHERE user_id = $1 AND week_id = $2',
    [userId, weekId]
  );
  return result.rows.map(row => row.option_id);
}

// Submit votes (replace all votes for user)
export async function submitVotes(userId: string, weekId: string, optionIds: string[]) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Delete existing votes
    await client.query('DELETE FROM votes WHERE user_id = $1 AND week_id = $2', [userId, weekId]);
    
    // Insert new votes
    for (const optionId of optionIds) {
      await client.query(
        'INSERT INTO votes (user_id, option_id, week_id) VALUES ($1, $2, $3)',
        [userId, optionId, weekId]
      );
    }
    
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// Reset weekly data (keep options, clear votes and attendance)
export async function resetWeeklyData() {
  const weekId = getCurrentWeekId();
  
  await pool.query('DELETE FROM votes WHERE week_id = $1', [weekId]);
  await pool.query('DELETE FROM user_attendance WHERE week_id = $1', [weekId]);
  
  console.log(`🔄 Weekly reset completed for week ${weekId}`);
}

export default pool;

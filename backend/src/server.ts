import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import { PORT } from './config';
import {
  initializeDatabase,
  ensureCurrentWeek,
  getAllUsers,
  getUserAttendance,
  updateAttendance,
  getOptions,
  addOption,
  getUserVotes,
  submitVotes,
  resetWeeklyData,
  getCurrentWeekId
} from './db';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
(async () => {
  try {
    await initializeDatabase();
    console.log('✅ Server initialization complete');
  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
    process.exit(1);
  }
})();

// Schedule weekly reset every Saturday at 12:00
cron.schedule('0 12 * * 6', async () => {
  console.log('🕐 Running scheduled weekly reset...');
  await resetWeeklyData();
});

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', week: getCurrentWeekId() });
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get current week attendance
app.get('/api/attendance', async (req, res) => {
  try {
    const weekId = await ensureCurrentWeek();
    const attendance = await getUserAttendance(weekId);
    res.json({ weekId, attendance });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

// Update user attendance
app.post('/api/attendance', async (req, res) => {
  try {
    const { userId, isAttending } = req.body;
    
    if (!userId || typeof isAttending !== 'boolean') {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    
    const weekId = await ensureCurrentWeek();
    await updateAttendance(userId, weekId, isAttending);
    
    res.json({ success: true, weekId, userId, isAttending });
  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({ error: 'Failed to update attendance' });
  }
});

// Get all options for current week
app.get('/api/options', async (req, res) => {
  try {
    const weekId = await ensureCurrentWeek();
    const options = await getOptions(weekId);
    res.json({ weekId, options });
  } catch (error) {
    console.error('Error fetching options:', error);
    res.status(500).json({ error: 'Failed to fetch options' });
  }
});

// Add new option
app.post('/api/options', async (req, res) => {
  try {
    const { name, addedBy, section } = req.body;
    
    if (!name || !addedBy) {
      return res.status(400).json({ error: 'Name and addedBy are required' });
    }
    
    const weekId = await ensureCurrentWeek();
    const option = await addOption(name, addedBy, weekId, section || 'Activity');
    
    res.json({ success: true, option });
  } catch (error) {
    console.error('Error adding option:', error);
    res.status(500).json({ error: 'Failed to add option' });
  }
});

// Get user votes
app.get('/api/votes/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const weekId = await ensureCurrentWeek();
    const votes = await getUserVotes(userId, weekId);
    
    res.json({ weekId, userId, votes });
  } catch (error) {
    console.error('Error fetching votes:', error);
    res.status(500).json({ error: 'Failed to fetch votes' });
  }
});

// Submit votes
app.post('/api/votes', async (req, res) => {
  try {
    const { userId, optionIds } = req.body;
    
    if (!userId || !Array.isArray(optionIds)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    
    const weekId = await ensureCurrentWeek();
    await submitVotes(userId, weekId, optionIds);
    
    res.json({ success: true, weekId, userId, optionIds });
  } catch (error) {
    console.error('Error submitting votes:', error);
    res.status(500).json({ error: 'Failed to submit votes' });
  }
});

// Manual reset endpoint (for testing)
app.post('/api/reset', async (req, res) => {
  try {
    await resetWeeklyData();
    res.json({ success: true, message: 'Weekly data reset successfully' });
  } catch (error) {
    console.error('Error resetting data:', error);
    res.status(500).json({ error: 'Failed to reset data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Friday Picker API running on http://localhost:${PORT}`);
  console.log(`📅 Current week: ${getCurrentWeekId()}`);
});

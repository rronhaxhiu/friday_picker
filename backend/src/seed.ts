// Optional seed script for demo data
import { initializeDatabase, addOption, submitVotes, updateAttendance, ensureCurrentWeek } from './db';

async function seed() {
  console.log('🌱 Seeding demo data...');

  await initializeDatabase();

  const weekId = await ensureCurrentWeek();
  console.log(`Week ID: ${weekId}`);

  // Add some demo options
  const option1 = await addOption('Bowling 🎳', 'rroni', weekId, 'Activity');
  const option2 = await addOption('Pizza Palace 🍕', 'fjordi', weekId, 'Food');
  const option3 = await addOption('The Black Cat Bar 🍺', 'peki', weekId, 'Bars');
  const option4 = await addOption('Karaoke Night 🎤', 'reznovi', weekId, 'Activity');
  const option5 = await addOption('Sushi Train 🍣', 'tella', weekId, 'Food');
  const option6 = await addOption('Rooftop Lounge 🌆', 'zingo', weekId, 'Bars');

  console.log('✅ Added 6 demo options (2 per section)');

  // Set some attendance
  await updateAttendance('cula', weekId, true);
  await updateAttendance('fjordi', weekId, true);
  await updateAttendance('peki', weekId, true);
  await updateAttendance('reznovi', weekId, false);
  await updateAttendance('rroni', weekId, true);
  await updateAttendance('tella', weekId, true);
  await updateAttendance('zingo', weekId, false);
  await updateAttendance('zorki', weekId, true);

  console.log('✅ Set demo attendance');

  // Add some votes
  await submitVotes('cula', weekId, [option1.id, option2.id, option3.id]);
  await submitVotes('fjordi', weekId, [option2.id, option5.id]);
  await submitVotes('peki', weekId, [option3.id, option6.id]);
  await submitVotes('rroni', weekId, [option1.id, option4.id]);
  await submitVotes('tella', weekId, [option2.id, option5.id, option6.id]);
  await submitVotes('zorki', weekId, [option1.id, option3.id]);

  console.log('✅ Added demo votes');

  console.log('🎉 Seeding complete! Start the server with: npm run dev');
  
  process.exit(0);
}

seed().catch(error => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});

# 🐳 Docker Setup for Friday Picker

Complete guide to running Friday Picker with PostgreSQL in Docker.

## 🚀 Quick Start

### 1. Install Docker

**Windows/Mac:**
- Download Docker Desktop: https://www.docker.com/products/docker-desktop

**Linux:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### 2. Start the Database

```bash
# From the project root
docker-compose up -d
```

This will:
- ✅ Download PostgreSQL image (first time only)
- ✅ Create database container
- ✅ Initialize tables automatically
- ✅ Start on port 5432

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Seed Demo Data (Optional)

```bash
npm run seed
```

### 5. Start the Backend

```bash
npm run dev
```

### 6. Start the Frontend

```bash
cd ../frontend
npm run dev
```

---

## 📋 Docker Commands

### Start Database
```bash
docker-compose up -d
```

### Stop Database
```bash
docker-compose down
```

### Stop & Remove Data (Fresh Start)
```bash
docker-compose down -v
```

### View Logs
```bash
docker-compose logs -f postgres
```

### Check Status
```bash
docker-compose ps
```

### Restart Database
```bash
docker-compose restart
```

---

## 🗄️ Database Access

### Connection Details
- **Host**: localhost
- **Port**: 5432
- **Database**: friday_picker
- **Username**: friday_user
- **Password**: friday_password

### Using DBeaver

1. **Create New Connection** → PostgreSQL
2. **Enter Details:**
   - Host: `localhost`
   - Port: `5432`
   - Database: `friday_picker`
   - Username: `friday_user`
   - Password: `friday_password`
3. **Test Connection** → **Finish**

### Using pgAdmin

1. **Add New Server**
2. **General Tab:**
   - Name: Friday Picker
3. **Connection Tab:**
   - Host: localhost
   - Port: 5432
   - Database: friday_picker
   - Username: friday_user
   - Password: friday_password

### Using Command Line (psql)

```bash
# Connect to database
docker exec -it friday-picker-db psql -U friday_user -d friday_picker

# Or if you have psql installed locally
psql -h localhost -U friday_user -d friday_picker
```

**Common psql commands:**
```sql
-- List tables
\dt

-- Describe table
\d users

-- View all users
SELECT * FROM users;

-- Exit
\q
```

---

## 🔧 Configuration

### Environment Variables

Edit `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=friday_user
DB_PASSWORD=friday_password
DB_NAME=friday_picker
PORT=3001
```

### Change Database Password

1. Edit `docker-compose.yml`:
   ```yaml
   environment:
     POSTGRES_PASSWORD: your_new_password
   ```

2. Edit `backend/.env`:
   ```env
   DB_PASSWORD=your_new_password
   ```

3. Restart:
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```

---

## 📊 Useful SQL Queries

### View Current Options
```sql
SELECT 
    o.name,
    o.section,
    u.name as added_by,
    COUNT(v.user_id) as votes
FROM options o
LEFT JOIN users u ON o.added_by = u.id
LEFT JOIN votes v ON o.id = v.option_id
GROUP BY o.id, u.name
ORDER BY o.section, votes DESC;
```

### View Attendance
```sql
SELECT 
    u.name,
    CASE 
        WHEN ua.is_attending THEN '✅ Coming'
        ELSE '❌ Not Coming'
    END as status
FROM users u
LEFT JOIN user_attendance ua ON u.id = ua.user_id
ORDER BY u.name;
```

### Clear All Data (Reset)
```sql
DELETE FROM votes;
DELETE FROM user_attendance;
DELETE FROM options;
```

---

## 🔄 Migration from SQLite

If you had SQLite data before:

### Export from SQLite
```bash
cd backend/data
sqlite3 friday-picker.db .dump > dump.sql
```

### Import to PostgreSQL (after editing for compatibility)
```bash
docker exec -i friday-picker-db psql -U friday_user -d friday_picker < dump.sql
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Check what's using port 5432
netstat -ano | findstr :5432  # Windows
lsof -ti:5432                  # Mac/Linux

# Change port in docker-compose.yml
ports:
  - "5433:5432"  # Use 5433 instead
```

### Container Won't Start
```bash
# View logs
docker-compose logs postgres

# Remove and recreate
docker-compose down -v
docker-compose up -d
```

### Connection Refused
```bash
# Wait for database to be ready
docker-compose ps

# Check health
docker exec friday-picker-db pg_isready -U friday_user
```

### Reset Everything
```bash
# Stop and remove everything
docker-compose down -v

# Remove images
docker rmi postgres:15-alpine

# Start fresh
docker-compose up -d
```

---

## 🎯 Production Considerations

### Use Docker Secrets
Instead of plain passwords in docker-compose.yml, use Docker secrets.

### Backup Database
```bash
# Backup
docker exec friday-picker-db pg_dump -U friday_user friday_picker > backup.sql

# Restore
docker exec -i friday-picker-db psql -U friday_user -d friday_picker < backup.sql
```

### Use External Volume
Mount to specific path:
```yaml
volumes:
  - /path/to/your/data:/var/lib/postgresql/data
```

---

## 📦 What's Included

- ✅ PostgreSQL 15 (Alpine - lightweight)
- ✅ Auto-initialization with schema
- ✅ Persistent data volume
- ✅ Health checks
- ✅ Auto-restart on failure
- ✅ Connection pooling in backend
- ✅ Environment variable configuration

---

**You're all set!** 🎉

Your database is now running in Docker and accessible via DBeaver, pgAdmin, or any PostgreSQL client!


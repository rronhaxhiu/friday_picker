# 🐳 Docker Deployment Guide

Complete guide for running Friday Picker with Docker.

---

## 🚀 Quick Start (Production)

### One Command Setup

```bash
docker-compose up -d
```

That's it! The app will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3000/api
- **Database**: Internal (not exposed)

### What Happens Automatically

1. ✅ **PostgreSQL** database is created
2. ✅ **Database schema** is initialized (tables, indexes)
3. ✅ **8 users** are inserted automatically
4. ✅ **Backend API** starts and connects to database
5. ✅ **Frontend** builds and serves with Nginx
6. ✅ **All services** are networked together

---

## 🛠️ Development Mode

For local development with hot-reload:

### 1. Start Database Only

```bash
docker-compose -f docker-compose.dev.yml up -d
```

### 2. Run Backend Locally

```bash
cd backend
npm install
npm run dev
```

### 3. Run Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

**Benefits:**
- Hot reload on code changes
- Direct access to logs
- Faster development cycle
- Database still in Docker (consistent)

---

## 📋 Common Commands

### Start Everything
```bash
docker-compose up -d
```

### Stop Everything
```bash
docker-compose down
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Rebuild After Code Changes
```bash
# Rebuild all
docker-compose up -d --build

# Rebuild specific service
docker-compose up -d --build backend
docker-compose up -d --build frontend
```

### Fresh Start (Delete All Data)
```bash
docker-compose down -v
docker-compose up -d
```

### Check Status
```bash
docker-compose ps
```

### Execute Commands in Containers
```bash
# Access backend shell
docker exec -it friday-picker-backend sh

# Access database
docker exec -it friday-picker-db psql -U friday_user -d friday_picker

# Access frontend (nginx)
docker exec -it friday-picker-frontend sh
```

---

## 🗄️ Database Access

### From Host Machine

The database is **not exposed** in production mode for security.

To access it:

**Option 1: Through Backend Container**
```bash
docker exec -it friday-picker-backend sh
# Then install psql if needed
apk add postgresql-client
psql -h postgres -U friday_user -d friday_picker
```

**Option 2: Expose Port (Dev Mode)**
Use `docker-compose.dev.yml` which exposes port 5432.

Then connect via DBeaver:
- Host: localhost
- Port: 5432
- Database: friday_picker
- Username: friday_user
- Password: friday_password

---

## 📦 Service Details

### PostgreSQL
- **Image**: postgres:15-alpine
- **Container**: friday-picker-db
- **Port**: Not exposed (internal only)
- **Volume**: postgres_data (persistent)
- **Auto-init**: Runs init.sql on first start

### Backend
- **Build**: From backend/Dockerfile
- **Container**: friday-picker-backend
- **Port**: 3001 (internal only)
- **Depends on**: postgres (waits for health check)
- **Auto-migrate**: Users inserted on startup

### Frontend
- **Build**: Multi-stage (Node → Nginx)
- **Container**: friday-picker-frontend
- **Port**: 3000 (exposed to host)
- **Serves**: Static React build via Nginx
- **Proxy**: /api → backend:3001

---

## 🔧 Configuration

### Environment Variables

Backend environment is set in `docker-compose.yml`:

```yaml
environment:
  DB_HOST: postgres
  DB_PORT: 5432
  DB_USER: friday_user
  DB_PASSWORD: friday_password
  DB_NAME: friday_picker
  PORT: 3001
  NODE_ENV: production
```

### Change Database Password

1. Edit `docker-compose.yml`:
   ```yaml
   postgres:
     environment:
       POSTGRES_PASSWORD: your_new_password
   
   backend:
     environment:
       DB_PASSWORD: your_new_password
   ```

2. Rebuild:
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```

### Change Port

Edit `docker-compose.yml`:
```yaml
frontend:
  ports:
    - "8080:80"  # Change 3000 to 8080
```

---

## 🚢 Production Deployment

### Deploy to Server

1. **Copy files to server:**
   ```bash
   scp -r . user@server:/path/to/friday-picker
   ```

2. **SSH into server:**
   ```bash
   ssh user@server
   cd /path/to/friday-picker
   ```

3. **Start services:**
   ```bash
   docker-compose up -d
   ```

### Use Reverse Proxy (Recommended)

**With Nginx:**
```nginx
server {
    listen 80;
    server_name friday.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**With Caddy:**
```
friday.yourdomain.com {
    reverse_proxy localhost:3000
}
```

### SSL/HTTPS

Use Let's Encrypt with Certbot or Caddy (auto-HTTPS).

---

## 💾 Backup & Restore

### Backup Database

```bash
# Create backup
docker exec friday-picker-db pg_dump -U friday_user friday_picker > backup_$(date +%Y%m%d).sql

# Or with docker-compose
docker-compose exec postgres pg_dump -U friday_user friday_picker > backup.sql
```

### Restore Database

```bash
# Restore from backup
docker exec -i friday-picker-db psql -U friday_user -d friday_picker < backup.sql

# Or with docker-compose
docker-compose exec -T postgres psql -U friday_user -d friday_picker < backup.sql
```

### Backup Volume

```bash
# Backup volume data
docker run --rm -v friday_picker_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/db_backup.tar.gz /data

# Restore volume data
docker run --rm -v friday_picker_postgres_data:/data -v $(pwd):/backup alpine tar xzf /backup/db_backup.tar.gz -C /
```

---

## 🔍 Monitoring

### Health Checks

All services have health checks configured:

```bash
# Check health status
docker-compose ps
```

Healthy services show "healthy" status.

### View Resource Usage

```bash
docker stats
```

Shows CPU, memory, and network usage for each container.

---

## 🐛 Troubleshooting

### Container Won't Start

```bash
# View logs
docker-compose logs [service_name]

# Check specific error
docker-compose logs backend | tail -50
```

### Database Connection Failed

```bash
# Check if postgres is healthy
docker-compose ps postgres

# Check backend can reach postgres
docker exec friday-picker-backend ping postgres
```

### Frontend Can't Reach Backend

```bash
# Check nginx config
docker exec friday-picker-frontend cat /etc/nginx/conf.d/default.conf

# Test backend health
docker exec friday-picker-frontend wget -O- http://backend:3001/api/health
```

### Reset Everything

```bash
# Nuclear option - removes everything
docker-compose down -v
docker system prune -a
docker volume prune
docker-compose up -d
```

---

## 🎯 Architecture

```
┌─────────────────────────────────────────┐
│  Internet / User                        │
└─────────────┬───────────────────────────┘
              │
              ▼
    ┌─────────────────┐
    │  Port 3000      │
    │  (Host)         │
    └────────┬────────┘
             │
             ▼
┌────────────────────────────────────────┐
│  Docker Network: friday-picker-network │
│                                         │
│  ┌──────────────────────────────────┐ │
│  │  Frontend (Nginx)                │ │
│  │  - Serves static React app       │ │
│  │  - Proxies /api to backend       │ │
│  │  - Port 80 (internal)            │ │
│  └────────────┬─────────────────────┘ │
│               │                        │
│               ▼                        │
│  ┌──────────────────────────────────┐ │
│  │  Backend (Node.js)               │ │
│  │  - Express API                   │ │
│  │  - Port 3001 (internal)          │ │
│  └────────────┬─────────────────────┘ │
│               │                        │
│               ▼                        │
│  ┌──────────────────────────────────┐ │
│  │  PostgreSQL Database             │ │
│  │  - Port 5432 (internal)          │ │
│  │  - Volume: postgres_data         │ │
│  └──────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📝 Files Overview

```
friday_picker/
├── docker-compose.yml          # Production setup
├── docker-compose.dev.yml      # Development (DB only)
├── backend/
│   ├── Dockerfile             # Backend container
│   ├── .dockerignore          # Files to exclude
│   └── init.sql               # Database schema
├── frontend/
│   ├── Dockerfile             # Frontend multi-stage build
│   ├── nginx.conf             # Nginx configuration
│   └── .dockerignore          # Files to exclude
└── DOCKER_DEPLOYMENT.md       # This file
```

---

## ✅ Checklist

Before deploying:

- [ ] Docker and Docker Compose installed
- [ ] Ports 3000 available (or changed in config)
- [ ] Sufficient disk space for images and volumes
- [ ] Firewall rules allow port 3000 (if remote)
- [ ] Backups configured (if production)
- [ ] Environment variables reviewed
- [ ] SSL/HTTPS configured (if public)

---

**You're all set!** 🎉

Run `docker-compose up -d` and your entire app stack will be running!


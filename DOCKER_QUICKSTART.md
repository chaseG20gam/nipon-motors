# Docker Quick Start Guide

## First Time Setup

```bash
# 1. generate environment variables
./generate-env.sh                      # macOS / Linux
# Windows users: copy .env.example to .env and fill the values

# 2. build containers, run migrations, load demo data, start everything
python scripts/bootstrap_sample_data.py

# 3. (optional) create your own superuser
docker compose exec backend python manage.py createsuperuser
```

## Access Your App

- **Frontend**: http://localhost
- **Django Admin**: http://localhost/admin/
- **API**: http://localhost/api/cars/

## Common Commands

```bash
# start services (after first build)
docker-compose up

# start in background
docker-compose up -d

# stop services
docker-compose down

# rebuild after code changes
docker-compose up --build

# view logs
docker-compose logs -f

# run django commands
docker-compose exec backend python manage.py <command>

# access database
docker-compose exec db psql -U postgres -d nipon_motors
```

## Architecture

```
User → NGINX (Port 80)
         ├─→ React App (static files)
         └─→ /api/* → Django (Port 8000) → PostgreSQL (Port 5432)
```

## What Each File Does

- **backend/Dockerfile**: Builds Python + Django container
- **frontend/Dockerfile**: Builds React, serves with NGINX  
- **frontend/nginx.conf**: Routes requests (React vs API)
- **docker-compose.yml**: Connects all services
- **.env**: Secret configuration (DON'T COMMIT!)
- **.dockerignore**: Excludes files from build

## Troubleshooting

**Port 80 already in use?**
```bash
# change port in docker-compose.yml
ports: ["8080:80"]  # Access via http://localhost:8080
```

**Database errors?**
```bash
# reset database
docker-compose down -v  # deletes volumes!
docker-compose up --build
```

**Frontend not updating?**
```bash
# rebuild frontend only
docker-compose build frontend
docker-compose up
```

## Production Deployment

1. Update `.env` with production values
2. Change `ALLOWED_HOSTS` to your domain
3. Change `CORS_ALLOWED_ORIGINS` to your frontend URL
4. Set `DEBUG=False`
5. Use strong `SECRET_KEY` and `DB_PASSWORD`
6. Deploy to AWS, DigitalOcean, etc.

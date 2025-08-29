# Docker Setup Instructions

## Option 1: Add user to docker group (Recommended)

Run these commands to add your user to the docker group:

```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Refresh group membership (or logout/login)
newgrp docker

# Verify docker works without sudo
docker --version
```

Then run the application:
```bash
cd /home/tung491/fin_account_for_dev/finacademy
docker compose up --build
```

## Option 2: Run with sudo (Quick start)

If you can't modify groups, run with sudo:

```bash
cd /home/tung491/fin_account_for_dev/finacademy
sudo docker compose up --build
```

## Option 3: Run PostgreSQL in Docker + App locally

Start just PostgreSQL:
```bash
sudo docker run --name finacademy-postgres \
  -e POSTGRES_DB=finacademy \
  -e POSTGRES_USER=finacademy \
  -e POSTGRES_PASSWORD=finacademy_pass \
  -p 5432:5432 \
  -d postgres:15-alpine
```

Then run the app locally:
```bash
cd backend
cp .env.example .env
# Edit .env to set: DATABASE_URL=postgresql://finacademy:finacademy_pass@localhost:5432/finacademy

npm run migrate
npm run seed

# Start backend
npm run dev
```

In another terminal:
```bash
cd frontend
npm run dev
```

## Accessing the Application

Once running:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

**Demo Accounts:**
- Student: `student@example.com` / `student123`
- Admin: `admin@finacademy.com` / `admin123`

## Troubleshooting

- **Permission denied**: User needs to be in docker group
- **Port already in use**: Stop existing containers with `docker stop container_name`
- **Database connection failed**: Ensure PostgreSQL container is running
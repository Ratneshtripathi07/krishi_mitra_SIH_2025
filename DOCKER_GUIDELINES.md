# Docker Guidelines

## Overview

This document explains how to use Docker for local development and deployment.

## Local Development

### Prerequisites
- Docker Desktop installed
- Docker Compose v2+

### Quick Start
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Individual Services
```bash
# Start only database
docker-compose up -d postgres redis

# Rebuild and start backend
docker-compose up --build backend

# Access database
docker-compose exec postgres psql -U postgres -d krishi_mitra
```

## Production Deployment

### Environment Variables
Create production `.env` files:
- `client/.env.production`
- `server/.env.production`

### Build Images
```bash
# Build production images
docker build -f Dockerfile.frontend -t krishi-mitra-frontend .
docker build -f Dockerfile.backend -t krishi-mitra-backend .
```

## Troubleshooting

### Common Issues
1. **Port conflicts**: Change ports in docker-compose.yml
2. **Permission issues**: Check file ownership
3. **Database connection**: Ensure postgres is running

### Useful Commands
```bash
# Clean up
docker-compose down -v
docker system prune

# View container status
docker-compose ps

# Execute commands in containers
docker-compose exec backend npm run prisma:migrate
```
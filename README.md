
### Backend Architecture Notes

#### Global Modules
To promote a clean architecture, the following NestJS modules are registered as **global**. Services they export (like `PrismaService`) can be injected into any other service without needing to import the module in that feature's local `.module.ts` file.

-   **`ConfigModule`**: Provides access to environment variables.
-   **`PrismaModule`**: Provides the `PrismaService` for database interactions.



<!-- # Krishi Mitra

A comprehensive agricultural advisory platform built with Next.js (frontend) and NestJS (backend).

## Project Structure

- `client/` - Next.js PWA frontend
- `server/` - NestJS backend API
- `docker-compose.yml` - Local development orchestration
- `TESTING_GUIDELINES.md` - Testing documentation
- `DOCKER_GUIDELINES.md` - Docker setup documentation

## Getting Started

1. Install dependencies in both client and server directories
2. Set up environment variables using the .env.example files
3. Run with Docker Compose for local development

```bash
docker-compose up -d
```

## Development

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Database: PostgreSQL on port 5432
- Redis: Port 6379 -->
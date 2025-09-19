# Krishi Mitra / Krishi Sakhi - Project Walkthrough

## Project Kick-off & Foundation (Steps 1-4)

-   **Step 1: Confirmation & Clarification:** Confirmed project scope, target user (Indian farmers with low digital literacy), and core features. Aligned on key principles like PWA for offline use, multilingual support, and a simple, rule-based advisory engine.
-   **Step 2: Technology Stack Proposal:** Finalized the tech stack: **Next.js (Frontend)**, **NestJS (Backend)**, **PostgreSQL (DB)**, **Redis (Cache)**, and **Prisma (ORM)**. Agreed to use browser-native APIs as a fallback for voice features, with Google Cloud STT/TTS for the primary demo.
-   **Step 3: System Architecture & Directory Structure:** Defined a decoupled architecture with a monolithic backend. Laid out the complete directory structure, including placeholders for Docker, testing, and i18n, and defined all necessary environment variables in `.env.example` files.
-   **Step 4: API Contract Definition:** Created a comprehensive, versioned (`/api/v1`) REST API contract. This serves as the single source of truth, enabling parallel development. All endpoints, request bodies, and response schemas were defined.

---

## Milestone 1: Setup & User Authentication (Backend)

We have completed the backend implementation for our foundational milestone.

### Key Components Created:

1.  **Database Schema (`schema.prisma`):**
    -   Defined the `User` model with database-level uniqueness on `phoneNumber` and automatic `createdAt`/`updatedAt` audit fields.

2.  **Core Services (`AuthService`, `UsersService`, `PrismaService`):**
    -   Implemented the full authentication logic, including OTP validation (mocked), login, logout, and token refresh.
    -   Established a secure token strategy using short-lived access tokens and long-lived, **hashed** refresh tokens stored in the database.
    -   Created a modular and global `PrismaService` for database interactions.

3.  **API Layer (`AuthController` & DTOs):**
    -   Built robust Data Transfer Objects (DTOs) with strict validation (`class-validator`), input normalization (`class-transformer`), and rich Swagger documentation (`@ApiProperty`).
    -   Implemented the controller with protected routes using custom Passport.js strategies (`jwt` and `jwt-refresh`).
    -   Created a custom `@GetUser` decorator for clean, typesafe access to the user payload in controllers.

4.  **Best Practices & Hardening:**
    -   **API Documentation:** Integrated Swagger (`/api/docs`) from the start.
    -   **Security:** Implemented global rate-limiting (`ThrottlerModule`) to prevent abuse, with stricter limits on the OTP endpoint.
    -   **Testing:** Created placeholder unit tests for DTOs and a more comprehensive E2E test suite for the controller, demonstrating how to mock services for isolated testing.

    ## Milestone 1: Setup & User Authentication (Frontend)

With the backend API in place, we built the foundational frontend components to handle the user-facing authentication flow.

### Key Components Created:

1.  **API Client (`apiClient.ts`):**
    -   Set up a global `axios` instance for all backend communication.
    -   Implemented robust `axios` interceptors to automatically attach the JWT access token to all requests and to transparently handle the token refresh logic on `401 Unauthorized` errors.

2.  **Global State Management (`AuthContext.tsx`):**
    -   Created a global React Context to manage the user's session state (`user`, `isAuthenticated`, `isLoading`) across the entire application.
    -   The context provides `login` and `logout` functions to any component, abstracting away the API calls and token management.
    -   On initial load, it re-hydrates the user's session from `localStorage` for a persistent login experience.

3.  **Login UI (`login/page.tsx`):**
    -   Developed a two-step login form using Next.js and React hooks.
    -   The UI connects to the `AuthContext` via the `useAuth()` hook to trigger the login flow.

### Best Practices & Hardening:

1.  **Infrastructure as Code (`Dockerfile.frontend`):**
    -   Created a multi-stage, production-hardened Dockerfile for the Next.js frontend, ensuring a small and secure final container by running as a non-root user.

2.  **Continuous Integration (`frontend-ci.yml`):**
    -   Set up a GitHub Actions workflow to automatically lint, build, and test the frontend code on every push and pull request, ensuring code quality and preventing build failures.

3.  **Project Organization:**
    -   Utilized Next.js Route Groups (`(auth)`) to logically organize authentication-related pages without affecting the URL structure.
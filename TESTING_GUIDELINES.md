# Testing Guidelines

## Overview

This document outlines testing practices for the Krishi Mitra application.

## Frontend Testing (Next.js)

### Setup
- Jest for unit testing
- React Testing Library for component testing
- Cypress for E2E testing

### Running Tests
```bash
cd client
npm test              # Unit tests
npm run test:e2e      # E2E tests
npm run test:coverage # Coverage report
```

### Test Structure
- `__tests__/` - Unit tests alongside components
- `cypress/` - E2E test specifications
- `test-utils/` - Testing utilities and mocks

## Backend Testing (NestJS)

### Setup
- Jest for unit and integration testing
- Supertest for API testing

### Running Tests
```bash
cd server
npm test              # Unit tests
npm run test:e2e      # E2E tests
npm run test:cov      # Coverage report
```

### Test Structure
- `*.spec.ts` - Unit tests alongside source files
- `test/` - E2E test specifications

## Best Practices

1. Write tests before implementing features (TDD)
2. Maintain >80% code coverage
3. Mock external dependencies
4. Use descriptive test names
5. Test error scenarios
6. Keep tests isolated and independent
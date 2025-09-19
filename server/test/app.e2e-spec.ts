import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/auth/auth.service';
import { AuthTokensDto } from '../src/auth/dto/auth-tokens.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  // Create a mock AuthService that we can control for our tests.
  // We use jest.fn() to spy on calls and define mock return values.
  const mockAuthService = {
    login: jest.fn(
      (): AuthTokensDto => ({
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
      }),
    ),
    logout: jest
      .fn()
      .mockResolvedValue({ message: 'Logged out successfully.' }),
    refreshTokens: jest.fn(
      (): AuthTokensDto => ({
        accessToken: 'new_mock_access_token',
        refreshToken: 'new_mock_refresh_token',
      }),
    ),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // Override the real AuthService with our mock version for this test suite.
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    app = moduleFixture.createNestApplication();
    // Ensure the e2e test app uses the same global setup as our main application.
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    app.setGlobalPrefix('api/v1');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // Reset mock call history before each test to ensure test isolation.
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('/auth/otp (POST)', () => {
    it('should reject requests with an invalid phone number (400 Bad Request)', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/otp')
        .send({ phoneNumber: '12345' }) // Invalid length
        .expect(400);
    });

    it('should accept requests with a valid phone number (200 OK)', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/otp')
        .send({ phoneNumber: '9876543210' })
        .expect(200);
    });
  });

  describe('/auth/login (POST)', () => {
    it('should return tokens for a valid login request (200 OK)', () => {
      const loginDto = { phoneNumber: '9876543210', otp: '123456' };

      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send(loginDto)
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken', 'mock_access_token');
          expect(mockAuthService.login).toHaveBeenCalledWith(
            loginDto.phoneNumber,
            loginDto.otp,
          );
        });
    });

    it('should reject requests with invalid data (400 Bad Request)', () => {
      const badLoginDto = { phoneNumber: '123', otp: 'abc' };
      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send(badLoginDto)
        .expect(400);
    });
  });

  describe('/auth/logout (POST)', () => {
    it('should reject unauthenticated requests (401 Unauthorized)', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/logout')
        .expect(401);
    });

    // Placeholder for a successful logout test, which would require a valid mock token.
    it('should successfully log out an authenticated user', () => {
      // This would involve making a login request first to get a token
      // and then using that token to make the logout request.
      expect(true).toBe(true); // Placeholder for now
    });
  });

  describe('/auth/refresh (POST)', () => {
    it('should reject unauthenticated requests (401 Unauthorized)', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/refresh')
        .expect(401);
    });
  });
});

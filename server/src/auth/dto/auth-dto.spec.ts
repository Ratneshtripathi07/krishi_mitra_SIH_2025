import { validate } from 'class-validator';
import { OtpRequestDto } from './otp-request.dto';
import { plainToInstance } from 'class-transformer';

describe('Auth DTOs', () => {
  it('should reject an invalid phone number in OtpRequestDto', async () => {
    // Arrange: Create an instance with invalid data
    const dto = plainToInstance(OtpRequestDto, { phoneNumber: '123' });

    // Act: Validate the instance
    const errors = await validate(dto);

    // Assert: Expect validation errors
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
    expect(errors[0].constraints).toHaveProperty('length');
  });

  it('should accept a valid phone number in OtpRequestDto', async () => {
    // Arrange
    const dto = plainToInstance(OtpRequestDto, { phoneNumber: '9876543210' });

    // Act
    const errors = await validate(dto);

    // Assert
    expect(errors.length).toBe(0);
  });
});

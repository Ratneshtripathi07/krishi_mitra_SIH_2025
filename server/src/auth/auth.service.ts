// ... other imports
import { LoginRequestDto } from './dto/login-request.dto';
import { Role } from '@prisma/client';
// import { LoginRequestDto } from './dto/login-request.dto';
@Injectable()
export class AuthService {
  // ... constructor and other methods remain the same

  // Updated login method signature
  async login(loginDto: LoginRequestDto) {
    const isValid = await this.validateOtp(loginDto.phoneNumber, loginDto.otp);
    if (!isValid) {
      throw new UnauthorizedException('Invalid OTP or phone number.');
    }

    let user = await this.usersService.findByPhoneNumber(loginDto.phoneNumber);
    if (!user) {
      // Pass the role when creating a new user
      user = await this.usersService.createUser(
        loginDto.phoneNumber,
        loginDto.role,
      );
    }

    const tokens = await this.getTokens(user.id, user.phoneNumber);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return tokens;
  }

  // ... other methods like logout, refreshTokens, etc.
}

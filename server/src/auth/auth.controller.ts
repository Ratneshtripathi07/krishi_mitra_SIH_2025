import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { OtpRequestDto } from './dto/otp-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthTokensDto } from './dto/auth-tokens.dto';
import {
  GetUser,
  JwtPayload,
  JwtPayloadWithRefreshToken,
} from './decorators/get-user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Request an OTP for a given phone number' })
  @ApiResponse({ status: 200, description: 'OTP request acknowledged.' })
  @ApiResponse({ status: 400, description: 'Invalid phone number format.' })
  @Throttle(3, 60)
  @Post('otp')
  @HttpCode(HttpStatus.OK)
  requestOtp(@Body() otpRequestDto: OtpRequestDto) {
    // DEMO-ONLY: In a real app, we would never return the OTP.
    // This is purely for hackathon demonstration purposes.
    return {
      message: `OTP request received for ${otpRequestDto.phoneNumber}. For MVP, use '123456'.`,
    };
  }

  @ApiOperation({
    summary: 'Log in with phone number and OTP to receive tokens',
  })
  @ApiOkResponse({
    description: 'User successfully logged in.',
    type: AuthTokensDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid OTP or phone number.' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<AuthTokensDto> {
    // TODO: Post-hackathon, for production security, the refresh token
    // should be sent to the client via a secure, HttpOnly cookie.
    return this.authService.login(
      loginRequestDto.phoneNumber,
      loginRequestDto.otp,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Log out and invalidate the refresh token' })
  @ApiResponse({ status: 200, description: 'Successfully logged out.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetUser('sub') userId: string) {
    return this.authService.logout(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a new access token using a refresh token' })
  @ApiOkResponse({
    description: 'Tokens successfully refreshed.',
    type: AuthTokensDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetUser() user: JwtPayloadWithRefreshToken,
  ): Promise<AuthTokensDto> {
    return this.authService.refreshTokens(user.sub, user.refreshToken);
  }
}
// import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common'
// import { AuthService } from './auth.service'
// import { LocalAuthGuard } from './guards/local-auth.guard'
// import { CreateUserDto } from '../users/dto/create-user.dto'

// @Controller('auth')
// export class AuthController {
//     constructor(private authService: AuthService) { }

//     @Post('register')
//     async register(@Body() createUserDto: CreateUserDto) {
//         return this.authService.register(createUserDto)
//     }

//     @UseGuards(LocalAuthGuard)
//     @Post('login')
//     async login(@Request() req) {
//         return this.authService.login(req.user)
//     }

//     @Post('refresh')
//     async refresh(@Body() body: { refreshToken: string }) {
//         return this.authService.refreshToken(body.refreshToken)
//     }
// }

import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OtpRequestDto } from './otp-request.dto';
import { Transform } from 'class-transformer';
import { Role } from '@prisma/client';

export class LoginRequestDto extends OtpRequestDto {
  @ApiProperty({ example: '123456', description: '6-digit OTP' })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @Length(6, 6, { message: 'OTP must be exactly 6 digits' })
  @Matches(/^\d{6}$/, { message: 'OTP must contain only digits' })
  otp: string;

  @ApiProperty({
    description: 'The role selected during sign-up. Only sent on first login.',
    enum: Role,
    required: false,
    example: 'FARMER',
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class OtpRequestDto {
  @ApiProperty({
    example: '9876543210',
    description: '10-digit Indian phone number',
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  @Length(10, 10, { message: 'Phone number must be exactly 10 digits' })
  @Matches(/^\d{10}$/, { message: 'Phone number must contain only digits' })
  phoneNumber: string;
}

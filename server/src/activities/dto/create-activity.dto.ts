import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsObject,
} from 'class-validator';

export class CreateActivityDto {
  @ApiProperty({ example: 'IRRIGATION' })
  @IsString()
  @IsNotEmpty()
  activityType: string;

  @ApiProperty({
    description: 'The date of the activity in ISO 8601 format',
    example: '2025-09-25T00:00:00.000Z',
  })
  @IsDateString()
  date: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'JSON object for specific data',
    required: false,
    example: { durationMinutes: 30 },
  })
  @IsOptional()
  @IsObject()
  data?: Record<string, any>;
}

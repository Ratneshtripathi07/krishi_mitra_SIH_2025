import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateCropCycleDto {
  @ApiProperty({ example: 'Tomato' })
  @IsString()
  @IsNotEmpty()
  cropName: string;

  @ApiProperty({
    description: 'The date of sowing in ISO 8601 format',
    example: '2025-09-20T00:00:00.000Z',
  })
  @IsDateString()
  sowingDate: string;
}

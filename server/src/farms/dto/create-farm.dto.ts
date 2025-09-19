import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsIn } from 'class-validator';

const soilTypes = ['sandy', 'clayey', 'loamy'];
const irrigationSources = ['rain-fed', 'canal', 'borewell', 'pond'];

export class CreateFarmDto {
  @ApiProperty({ example: 'Home Field' })
  @IsString()
  @IsNotEmpty()
  farmName: string;

  @ApiProperty({ example: 28.6139 })
  @IsNumber()
  locationLat: number;

  @ApiProperty({ example: 77.209 })
  @IsNumber()
  locationLon: number;

  @ApiProperty({ example: 'loamy', enum: soilTypes })
  @IsString()
  @IsIn(soilTypes)
  soilType: string;

  @ApiProperty({ example: 'canal', enum: irrigationSources })
  @IsString()
  @IsIn(irrigationSources)
  irrigationSource: string;
}

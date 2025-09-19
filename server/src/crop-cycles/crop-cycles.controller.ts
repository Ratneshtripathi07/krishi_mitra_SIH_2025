import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  ParseUUIDPipe,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { CropCyclesService } from './crop-cycles.service';
import { CreateCropCycleDto } from './dto/create-crop-cycle.dto';

@ApiTags('Crop Cycles')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller()
export class CropCyclesController {
  constructor(private readonly cropCyclesService: CropCyclesService) {}

  @Post('farms/:farmId/cycles')
  @ApiOperation({ summary: 'Create a new crop cycle for a specific farm' })
  create(
    @GetUser('sub') userId: string,
    @Param('farmId', ParseUUIDPipe) farmId: string,
    @Body() createCropCycleDto: CreateCropCycleDto,
  ) {
    return this.cropCyclesService.create(userId, farmId, createCropCycleDto);
  }

  @Get('farms/:farmId/cycles')
  @ApiOperation({ summary: 'Get all crop cycles for a specific farm' })
  findAll(
    @GetUser('sub') userId: string,
    @Param('farmId', ParseUUIDPipe) farmId: string,
  ) {
    return this.cropCyclesService.findAllByFarm(userId, farmId);
  }
}

// import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common'
// import { CropCyclesService } from './crop-cycles.service'
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

// @Controller('crop-cycles')
// @UseGuards(JwtAuthGuard)
// export class CropCyclesController {
//     constructor(private readonly cropCyclesService: CropCyclesService) { }

//     @Post()
//     create(@Request() req, @Body() createCropCycleDto: any) {
//         return this.cropCyclesService.create(req.user.userId, createCropCycleDto)
//     }

//     @Get()
//     findAll(@Request() req) {
//         return this.cropCyclesService.findAllForUser(req.user.userId)
//     }

//     @Get(':id')
//     findOne(@Param('id') id: string) {
//         return this.cropCyclesService.findOne(+id)
//     }

//     @Patch(':id')
//     update(@Param('id') id: string, @Body() updateCropCycleDto: any) {
//         return this.cropCyclesService.update(+id, updateCropCycleDto)
//     }

//     @Delete(':id')
//     remove(@Param('id') id: string) {
//         return this.cropCyclesService.remove(+id)
//     }
// }

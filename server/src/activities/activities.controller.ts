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
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';

@ApiTags('Activities')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller()
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post('cycles/:cycleId/activities')
  @ApiOperation({ summary: 'Log a new activity for a specific crop cycle' })
  create(
    @GetUser('sub') userId: string,
    @Param('cycleId', ParseUUIDPipe) cycleId: string,
    @Body() createActivityDto: CreateActivityDto,
  ) {
    return this.activitiesService.create(userId, cycleId, createActivityDto);
  }

  @Get('cycles/:cycleId/activities')
  @ApiOperation({ summary: 'Get all activities for a specific crop cycle' })
  findAll(
    @GetUser('sub') userId: string,
    @Param('cycleId', ParseUUIDPipe) cycleId: string,
  ) {
    return this.activitiesService.findAllByCropCycle(userId, cycleId);
  }
}

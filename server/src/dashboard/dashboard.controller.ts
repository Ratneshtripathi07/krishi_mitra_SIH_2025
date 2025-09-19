import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('farmer')
  @ApiOperation({
    summary: "Get all aggregated data for the farmer's dashboard",
  })
  getFarmerDashboard(@GetUser('sub') userId: string) {
    return this.dashboardService.getFarmerDashboardData(userId);
  }
}

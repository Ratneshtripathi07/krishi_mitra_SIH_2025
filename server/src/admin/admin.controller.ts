import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '@prisma/client';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard) // Apply both JWT auth and Role check
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('analytics')
  @Roles(Role.ADMIN) // This endpoint requires the ADMIN role
  @ApiOperation({ summary: 'Get analytical data for the admin dashboard' })
  getAnalytics() {
    return this.adminService.getDashboardAnalytics();
  }

  @Get('farmers')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get a list of all farmers' })
  getAllFarmers() {
    return this.adminService.getAllFarmers();
  }
}
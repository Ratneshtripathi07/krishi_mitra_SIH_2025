import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DatabaseModule } from '../common/database/database.module';
import { WeatherModule } from '../external-services/weather.module';

@Module({
  imports: [DatabaseModule, WeatherModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}

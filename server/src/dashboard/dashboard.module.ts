import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { WeatherModule } from '../external-services/weather.module'; // Assuming you have this from a previous step

@Module({
  imports: [WeatherModule], // Import any modules with services we need
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WeatherService } from '../external-services/weather.service';

@Injectable()
export class DashboardService {
  constructor(
    private prisma: PrismaService,
    private weatherService: WeatherService,
  ) {}

  async getFarmerDashboardData(userId: string) {
    // For now, we'll just get the first farm. A real implementation would be more complex.
    const farm = await this.prisma.farm.findFirst({
      where: { userId },
    });

    let weatherData = null;
    if (farm) {
      weatherData = await this.weatherService.getCurrentWeather(
        farm.locationLat,
        farm.locationLon,
      );
    }

    // Mock data for other components
    const marketPrices = { crop: 'Tomato', price: 1550, trend: 'up' };
    const alerts = [
      {
        id: 1,
        message: 'Heavy rain expected tomorrow, avoid irrigation.',
        type: 'weather',
      },
    ];
    const cropStatus = {
      name: 'Brinjal Crop',
      daysToHarvest: 45,
      progress: 50,
    };

    return {
      weather: weatherData,
      marketPrices,
      alerts,
      cropStatus,
    };
  }
}

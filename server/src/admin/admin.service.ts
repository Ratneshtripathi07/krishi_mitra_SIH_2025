import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // Method to get analytical dashboard data (mocked)
  async getDashboardAnalytics() {
    const totalUsers = await this.prisma.user.count({ where: { role: 'FARMER' } });
    const totalFarms = await this.prisma.farm.count();

    return {
      totalFarmers: totalUsers,
      totalFarms: totalFarms,
      cropDistribution: [
        { crop: 'Tomato', count: 120 },
        { crop: 'Brinjal', count: 85 },
        { crop: 'Wheat', count: 210 },
      ],
      regionalDistribution: [
        { region: 'Pune', farmers: 50 },
        { region: 'Satara', farmers: 75 },
        { region: 'Nashik', farmers: 150 },
      ],
    };
  }

  // Method to get a list of all farmers
  async getAllFarmers() {
    return this.prisma.user.findMany({
      where: { role: 'FARMER' },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        createdAt: true,
        farms: {
          select: {
            id: true,
            farmName: true,
          }
        }
      },
    });
  }
}
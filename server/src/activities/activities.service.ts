import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, cropCycleId: string, dto: CreateActivityDto) {
    // Verify user owns the crop cycle before creating an activity
    const cropCycle = await this.prisma.cropCycle.findUnique({
      where: { id: cropCycleId },
      include: { farm: true },
    });

    if (!cropCycle || cropCycle.farm.userId !== userId) {
      throw new ForbiddenException('Access to this resource is denied');
    }

    return this.prisma.activity.create({
      data: {
        ...dto,
        cropCycleId,
      },
    });
  }

  async findAllByCropCycle(userId: string, cropCycleId: string) {
    const cropCycle = await this.prisma.cropCycle.findUnique({
      where: { id: cropCycleId },
      include: { farm: true },
    });

    if (!cropCycle || cropCycle.farm.userId !== userId) {
      throw new ForbiddenException('Access to this resource is denied');
    }

    return this.prisma.activity.findMany({
      where: { cropCycleId },
      orderBy: { date: 'desc' },
    });
  }
}

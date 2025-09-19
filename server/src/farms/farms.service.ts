import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';

@Injectable()
export class FarmsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createFarmDto: CreateFarmDto) {
    return this.prisma.farm.create({
      data: {
        ...createFarmDto,
        userId,
      },
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.farm.findMany({
      where: { userId },
    });
  }

  async findOne(userId: string, farmId: string) {
    const farm = await this.prisma.farm.findUnique({
      where: { id: farmId },
    });

    if (!farm || farm.userId !== userId) {
      throw new ForbiddenException('Access to this resource is denied');
    }
    return farm;
  }

  async update(userId: string, farmId: string, updateFarmDto: UpdateFarmDto) {
    await this.findOne(userId, farmId); // Reuse validation logic
    return this.prisma.farm.update({
      where: { id: farmId },
      data: updateFarmDto,
    });
  }

  async remove(userId: string, farmId: string) {
    await this.findOne(userId, farmId); // Reuse validation logic
    return this.prisma.farm.delete({
      where: { id: farmId },
    });
  }
}

import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCropCycleDto } from './dto/create-crop-cycle.dto';

@Injectable()
export class CropCyclesService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, farmId: string, dto: CreateCropCycleDto) {
        // First, verify the user owns the farm
        const farm = await this.prisma.farm.findUnique({ where: { id: farmId } });
        if (!farm || farm.userId !== userId) {
            throw new ForbiddenException('Access to this resource is denied');
        }

        return this.prisma.cropCycle.create({
            data: {
                ...dto,
                farmId,
            },
        });
    }

    async findAllByFarm(userId: string, farmId: string) {
        // Verify user ownership of the farm before listing cycles
        const farm = await this.prisma.farm.findUnique({ where: { id: farmId } });
        if (!farm || farm.userId !== userId) {
            throw new ForbiddenException('Access to this resource is denied');
        }

        return this.prisma.cropCycle.findMany({
            where: { farmId },
        });
    }
}

// import { Injectable } from '@nestjs/common'
// import { PrismaService } from '../common/database/prisma.service'

// @Injectable()
// export class CropCyclesService {
//     constructor(private prisma: PrismaService) { }

//     async create(userId: number, createCropCycleDto: any) {
//         return this.prisma.cropCycle.create({
//             data: {
//                 ...createCropCycleDto,
//                 userId,
//             },
//         })
//     }

//     async findAllForUser(userId: number) {
//         return this.prisma.cropCycle.findMany({
//             where: { userId },
//             include: {
//                 activities: true,
//             },
//             orderBy: { createdAt: 'desc' },
//         })
//     }

//     async findOne(id: number) {
//         return this.prisma.cropCycle.findUnique({
//             where: { id },
//             include: {
//                 activities: true,
//             },
//         })
//     }

//     async update(id: number, updateCropCycleDto: any) {
//         return this.prisma.cropCycle.update({
//             where: { id },
//             data: updateCropCycleDto,
//         })
//     }

//     async remove(id: number) {
//         return this.prisma.cropCycle.delete({
//             where: { id },
//         })
//     }
// }
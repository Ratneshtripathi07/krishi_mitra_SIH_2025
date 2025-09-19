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
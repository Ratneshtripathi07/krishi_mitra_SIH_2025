// import { Injectable } from '@nestjs/common'
// import { PrismaService } from '../common/database/prisma.service'

// @Injectable()
// export class AdvisoryService {
//     constructor(private prisma: PrismaService) { }

//     async findAllForUser(userId: number) {
//         return this.prisma.advisory.findMany({
//             where: { userId },
//             orderBy: { createdAt: 'desc' },
//         })
//     }

//     async findOne(id: number) {
//         return this.prisma.advisory.findUnique({
//             where: { id },
//         })
//     }

//     async generateAdvice(userId: number, cropType: string, location: string) {
//         // This is a simplified advisory generation
//         // In a real implementation, this would integrate with ML models,
//         // weather data, soil conditions, etc.

//         const advice = this.getBasicAdvice(cropType, location)

//         return this.prisma.advisory.create({
//             data: {
//                 userId,
//                 title: `Advisory for ${cropType}`,
//                 content: advice,
//                 category: 'general',
//                 priority: 'medium',
//             },
//         })
//     }

//     private getBasicAdvice(cropType: string, location: string): string {
//         // Basic advisory logic - replace with actual ML/AI integration
//         const adviceMap = {
//             wheat: 'Monitor for rust diseases. Ensure adequate nitrogen supply during tillering stage.',
//             rice: 'Maintain water levels. Watch for blast disease symptoms.',
//             corn: 'Check for corn borer infestation. Ensure proper spacing for air circulation.',
//             default: 'Monitor crop health regularly. Ensure proper irrigation and pest management.',
//         }

//         return adviceMap[cropType.toLowerCase()] || adviceMap.default
//     }
// }
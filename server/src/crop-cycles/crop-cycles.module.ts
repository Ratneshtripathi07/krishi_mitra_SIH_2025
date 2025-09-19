import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { FarmsModule } from './farms/farms.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CropCyclesModule } from './crop-cycles/crop-cycles.module';
import { WeatherModule } from './external-services/weather.module'; // Assuming this module exists for WeatherService

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        // Core Modules
        PrismaModule,
        // Feature Modules
        AuthModule,
        UsersModule,
        FarmsModule,
        DashboardModule,
        CropCyclesModule,
        WeatherModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule { }
// import { Module } from '@nestjs/common'
// import { CropCyclesController } from './crop-cycles.controller'
// import { CropCyclesService } from './crop-cycles.service'
// import { DatabaseModule } from '../common/database/database.module'

// @Module({
//     imports: [DatabaseModule],
//     controllers: [CropCyclesController],
//     providers: [CropCyclesService],
// })
// export class CropCyclesModule { }
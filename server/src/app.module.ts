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
import { WeatherModule } from './external-services/weather.module';
import { ActivitiesModule } from './activities/activities.module'; // <-- Import
import { ActivitiesModule } from './activities/activities.module';
import { AdminModule } from './admin/admin.module'; // <-- Import
import { ContentModule } from './content/content.module'; // <-- Import

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
        PrismaModule,
        AuthModule,
        UsersModule,
        FarmsModule,
        DashboardModule,
        CropCyclesModule,
        ActivitiesModule, // <-- Register
        WeatherModule,
        ActivitiesModule,
        AdminModule, // <-- Register
        ContentModule, 
    ],
    controllers: [],
    providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule { }
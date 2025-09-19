import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                // This is a default secret for the module, but we will sign tokens
                // with specific secrets and expiration times in the service.
                secret: config.get<string>('JWT_ACCESS_SECRET'),
                signOptions: {
                    expiresIn: config.get<string>('JWT_ACCESS_EXPIRATION'),
                },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule { }


// import { Module } from '@nestjs/common'
// import { JwtModule } from '@nestjs/jwt'
// import { PassportModule } from '@nestjs/passport'
// import { ConfigModule, ConfigService } from '@nestjs/config'
// import { AuthController } from './auth.controller'
// import { AuthService } from './auth.service'
// import { UsersModule } from '../users/users.module'
// import { JwtStrategy } from './strategies/jwt.strategy'
// import { LocalStrategy } from './strategies/local.strategy'

// @Module({
//     imports: [
//         UsersModule,
//         PassportModule,
//         JwtModule.registerAsync({
//             imports: [ConfigModule],
//             useFactory: async (configService: ConfigService) => ({
//                 secret: configService.get<string>('JWT_SECRET'),
//                 signOptions: {
//                     expiresIn: configService.get<string>('JWT_EXPIRES_IN', '15m'),
//                 },
//             }),
//             inject: [ConfigService],
//         }),
//     ],
//     controllers: [AuthController],
//     providers: [AuthService, LocalStrategy, JwtStrategy],
//     exports: [AuthService],
// })
// export class AuthModule { }
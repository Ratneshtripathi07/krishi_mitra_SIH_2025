import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

type JwtPayload = {
    sub: string;
    phoneNumber: string;
};

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // The secret key for signing refresh JWTs, stored in .env
            secretOrKey: config.get<string>('JWT_REFRESH_SECRET'),
            passReqToCallback: true, // Pass the request object to the validate method
        });
    }

    // This method runs after the refresh token has been successfully verified.
    validate(req: Request, payload: JwtPayload) {
        const refreshToken = req.get('authorization').replace('Bearer', '').trim();
        // We return the original payload along with the refresh token itself.
        // This combined object will be attached to `req.user`.
        return { ...payload, refreshToken };
    }
}
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Define the shape of the user payload attached by our JWT strategies
export type JwtPayload = {
    sub: string;
    phoneNumber: string;
};

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };

export const GetUser = createParamDecorator(
    (data: keyof JwtPayloadWithRefreshToken | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        return data ? user?.[data] : user;
    },
);
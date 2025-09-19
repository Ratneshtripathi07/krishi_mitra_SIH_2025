import { ApiProperty } from '@nestjs/swagger';

export class AuthTokensDto {
  @ApiProperty({
    description:
      'A short-lived JSON Web Token for authenticating API requests.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicGhvbmVOdW1iZXIiOiI5ODc2NTQzMjEwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  readonly accessToken: string;

  @ApiProperty({
    description:
      'A long-lived JSON Web Token used to obtain a new access token.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicGhvbmVOdW1iZXIiOiI5ODc2NTQzMjEwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  readonly refreshToken: string;
}

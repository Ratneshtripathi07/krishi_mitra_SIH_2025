import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({
        example: 'Ram Kumar Singh',
        description: "The user's full name",
        required: false,
    })
    @IsOptional()
    @IsString()
    @Length(2, 50)
    name?: string;

    @ApiProperty({
        example: 'en',
        description: "The user's preferred language code (e.g., 'en', 'hi')",
        required: false,
    })
    @IsOptional()
    @IsString()
    @Length(2, 5)
    languagePreference?: string;
}

// import { PartialType } from '@nestjs/mapped-types'
// import { CreateUserDto } from './create-user.dto'

// export class UpdateUserDto extends PartialType(CreateUserDto) { }
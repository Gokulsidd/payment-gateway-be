import { IsArray, IsDate, isDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsOptional()
    @IsArray()
    roles?: string[];

    @IsOptional()
    @IsDate()
    created_at?: Date

    @IsOptional()
    @IsDate()
    updated_at?: Date
}
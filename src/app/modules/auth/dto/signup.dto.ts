import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class signUpDto {
    @IsNotEmpty()
    @IsString()
    name: string


    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    business_name: string;

    @IsNotEmpty()
    @IsString()
    webhook_url: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsArray()
    roles?: string[];

    @IsOptional()
    @IsDate()
    created_at?: Date;

    @IsOptional()
    @IsDate()
    updated_at?: Date;
}
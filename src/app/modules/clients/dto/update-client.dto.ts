import { IsDate, IsOptional, IsString } from "class-validator";
import { UpdateDateColumn } from "typeorm";

export class UpdateClientDto {
    @IsString()
    @IsOptional()
    email?: string;
  
    @IsString()
    @IsOptional()
    business_name?: string;
  
    @IsString()
    @IsOptional()
    webhook_url?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @UpdateDateColumn()
    @IsOptional()
    @IsDate()
    updated_at: string
  }
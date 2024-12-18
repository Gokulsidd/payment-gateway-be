import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  business_name: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  webhook_url: string;

  @IsString()
  api_key: string;

  @IsOptional()
  @IsString()
  is_active: boolean;
  
  @CreateDateColumn()
  @IsOptional()
  @IsDate()
  created_at: Date;
}

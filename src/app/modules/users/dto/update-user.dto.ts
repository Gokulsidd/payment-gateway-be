import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UpdateDateColumn } from 'typeorm';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsArray()
  roles?: string[];

  @IsOptional()
  @IsDate()
  created_at?: Date;

  @UpdateDateColumn()
  @IsOptional()
  @IsDate()
  updated_at: Date;
}

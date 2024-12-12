import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsDate, IsOptional } from "class-validator";
import { UpdateDateColumn } from "typeorm";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @UpdateDateColumn()
    @IsOptional()
    @IsDate()
    updated_at: Date
}
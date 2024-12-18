import { PartialType } from "@nestjs/mapped-types";
import { CreateClientDto } from "./create-client.dto";
import { UpdateDateColumn } from "typeorm";
import { IsDate, IsOptional } from "class-validator";

export class UpdateClientDto extends PartialType(CreateClientDto) {
    @UpdateDateColumn()
    @IsOptional()
    @IsDate()
    updated_at: string
}
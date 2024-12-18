import {  Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "./entities/client.entity";
import { ClientServices } from "./services/client.service";
import { UsersService } from "../users/services/users.service";
import { User } from "../users/entities/user.entity";
import { ClientController } from "./controllers/client.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Client, User])],
    controllers: [ClientController],
    providers: [ClientServices, UsersService],
    exports: [ClientServices]
})

export class ClientModule {}
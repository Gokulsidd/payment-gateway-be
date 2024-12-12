import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configurations } from "./configuration";
import { POSTGRES } from "./database/postgres";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [...configurations],
            isGlobal: true
        }),
        POSTGRES
    ],
})

export class ConfigsModule {}
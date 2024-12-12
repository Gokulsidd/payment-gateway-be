import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtAuthMiddleware } from "./jwt-auth.middleware";
import { JwtService } from "@nestjs/jwt";

@Module({
    providers: [JwtAuthMiddleware, JwtService],
    exports: [JwtAuthMiddleware]
})
export class JwtModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JwtAuthMiddleware).forRoutes("*");
    }
}
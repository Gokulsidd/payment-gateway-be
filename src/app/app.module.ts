import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigsModule } from 'src/config/config.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/core/guards/role.guard';
import { JwtAuthMiddleware } from 'src/core/middlewares/jwt-auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './modules/auth/controllers/auth.controller';
import { UsersController } from './modules/users/controllers/users.controller';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60, // Time-to-live (in seconds)
        limit: 10, // Number of requests per ttl
      },
    ]),
    ConfigsModule,
    UsersModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}

import { MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { JwtAuthMiddleware } from 'src/core/middlewares/jwt-auth.middleware';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get('JWT.secret') || 'defaultSecret';
        console.log('JWT Secret:', secret);
        return {
          secret,
          global: true,
          signOptions: {
            expiresIn: '60s',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,
    JwtModule,
    {
        provide: APP_GUARD,
        useClass: AuthGuard
    }
  ],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
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
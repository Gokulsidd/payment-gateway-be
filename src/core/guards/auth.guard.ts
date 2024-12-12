import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY } from "../decorators/auth.decorator";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private configService: ConfigService
    ){}

    async canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [ 
            context.getHandler(),
            context.getClass(),
         ]);

         if(isPublic){
            return true;
         }

         const request = context.switchToHttp().getRequest();
         const token = this.extractTokenFromHeader(request);
         console.log('retrieved token from auth guard:', token)
         if ( !token) {
            throw new UnauthorizedException();
         }

         try{
            const payLoad =  await this.jwtService.verifyAsync(token, { secret: this.configService.get('JWT.secret') });
            request['trainer'] = payLoad;
         } catch {
            throw new UnauthorizedException();
         }

         return true

        }
        private extractTokenFromHeader(request: Request) {
           const [type, token] = request.headers.authorization?.split(' ') ?? [];
           return type === 'Bearer' ? token : undefined
        }

    }
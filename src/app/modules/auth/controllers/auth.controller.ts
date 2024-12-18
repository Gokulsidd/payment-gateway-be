import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { SignInDto } from "../dto/signin.dto";
import { AuthService } from "../services/auth.service";
import { signUpDto } from "../dto/signup.dto";
import { skipAuth } from "src/core/decorators/auth.decorator";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @skipAuth()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async singIn(@Body() signInDto: SignInDto){
        return await this.authService.signIn(signInDto)
    }
    
    @skipAuth()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    async signUp(@Body() signUpDto: signUpDto) {
        return await this.authService.signUp(signUpDto)
    }

    @skipAuth()
    @HttpCode(HttpStatus.OK)
    @Post('register-admin')
    async signUpAdmin(@Body() signUpDto: signUpDto) {
        return await this.authService.signUpAdmin(signUpDto)
    }

    
}
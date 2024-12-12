import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { SignInDto } from "../dto/signin.dto";
import { AuthService } from "../services/auth.service";
import { signUpDto } from "../dto/signup.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async singIn(@Body() signInDto: SignInDto){
        return await this.authService.signIn(signInDto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async signUp(@Body() signUpDto: signUpDto) {
        return await this.authService.signUp(signUpDto)
    }
}
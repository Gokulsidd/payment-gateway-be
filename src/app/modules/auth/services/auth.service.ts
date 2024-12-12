import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../../users/services/users.service";
import { SignInDto } from "../dto/signin.dto";
import * as bcrypt from 'bcrypt';
import { Role } from "src/core/utils/roles";
import { signUpDto } from "../dto/signup.dto";

@Injectable()
export class AuthService {
    constructor(
        private userServices: UsersService,
    ){}

    async signIn(signInDto: SignInDto){
        const user = await this.userServices.findOne(signInDto.email)

        if(!user){
            throw new UnauthorizedException("Invalid email or password");
        }

        const passMatch = await bcrypt.compare(signInDto.password, user.password)
        if(!passMatch) {
            console.log('incorrect password')
            throw new UnauthorizedException("invalid email or Password")
        }

        return {
            message: 'Sign in successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                roles: user.roles
            }
        }
    }

    async signUp(signUpDto: signUpDto) {
        const existingUser = await this.userServices.findOne(signUpDto.email);
        if (existingUser) {
            throw new ConflictException("User already exists with this email")
        }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(signUpDto.password, salt);
            const newUser = await this.userServices.create({
                ...signUpDto,
                password: hashedPassword,
                roles: signUpDto.roles || [Role.Client],
                created_at: new Date(),
                updated_at: new Date()
            });

        return {
            message: 'Sign up successful',
            user: newUser
          };
    }
}
import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UsersService } from "../services/users.service";
import { UpdateUserDto } from "../dto/update-user.dto";
import { skipAuth } from "src/core/decorators/auth.decorator";
import { Roles } from "src/core/decorators/role.decorators";
import { Role } from "src/core/utils/roles";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @skipAuth()
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto)
    }

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get(':email')
    async findOne(@Param('email') email: string) {
        return await this.usersService.findOne(email)
    }

    @Get(':id')
    async findOneById(@Param('id') id: string) {
        return await this.usersService.findOne(id)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return await this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    async remove(@Param('id') id: string) {
        return await this.usersService.remove(id);
    }
}
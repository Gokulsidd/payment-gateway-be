import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UsersService } from "../services/users.service";
import { UpdateUserDto } from "../dto/update-user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

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
    async remove(@Param('id') id: string) {
        return await this.usersService.remove(id);
    }
}
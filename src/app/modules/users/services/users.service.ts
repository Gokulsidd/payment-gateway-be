import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const saltRounds = this.configService.get('GENERAL.salt_or_round') || 10;

    const newUser = await this.userRepository.create({
      ...createUserDto,
      password: createUserDto.password,
      roles: createUserDto.roles || ['client'],
    });

    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = {
      ...updateUserDto,
      updated_at: new Date()
    }
    return await this.userRepository.update({ id }, updatedUser);
  }

  async remove(id: string) {
    return await this.userRepository.delete({ id });
  }
}

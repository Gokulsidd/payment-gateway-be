import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../entities/client.entity';
import { DataSource, Repository } from 'typeorm';
import { UpdateClientDto } from '../dto/update-client.dto';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class ClientServices {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  async create(payload: any) {
    const newClient = this.clientRepository.create({
      ...payload,
      updated_at: new Date(),
    });

    return await this.clientRepository.save(newClient);
  }

  async getClientDetailsForAuthenticatedUser(userId: string): Promise<any> {
    const client = await this.clientRepository
      .createQueryBuilder('client')
      .innerJoinAndSelect('client.user', 'user') // Join with the User table
      .select([
        'client.id',
        'client.business_name',
        'client.email',
        'client.webhook_url',
        'client.api_key',
        'client.is_Active',
        'user.name',
        'user.email',
      ])
      .where('client.user_id = :userId', { userId }) // Filter by the current user's ID
      .getOne(); // Use getOne() to return a single record

    if (!client) {
      throw new Error('Client not found'); // Or a custom error
    }

    return client;
  }

  async updateClientDetails(userId: string, body: UpdateClientDto): Promise<Client> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    if (!body || Object.keys(body).length === 0) {
      throw new BadRequestException('Update data is required');
    }

    const client = await this.clientRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!client) {
      throw new NotFoundException(`Client with user ID ${userId} not found`);
    }

    const allowedFields: (keyof UpdateClientDto)[] = ['email', 'business_name', 'webhook_url'];
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Update client fields
      for (const field of allowedFields) {
        if (field in client && body[field] !== undefined) {
          client[field] = body[field];
        }

        if(field in client.user && body[field] !== undefined){
          client.user[field] = body[field]
          await queryRunner.manager.save(User, client.user);
        }
      }

      // Save the updated client entity
      const updatedClient = await queryRunner.manager.save(Client, client);

      await queryRunner.commitTransaction();
      console.log('Updated client successfully:', updatedClient);

      return updatedClient;
    } catch (error) {
      console.error('Error updating client:', error);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('Failed to update client details');
    } finally {
      await queryRunner.release();
    }
  }

}

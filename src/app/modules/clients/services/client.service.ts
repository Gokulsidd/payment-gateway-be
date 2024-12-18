import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "../entities/client.entity";
import { Repository } from "typeorm";

@Injectable()
export class ClientServices {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>
    ){}

    async create(payload: any) {
        const newClient = this.clientRepository.create({
            ...payload,
            updated_at: new Date(),
        })

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
            'user.email'
          ])
          .where('client.user_id = :userId', { userId }) // Filter by the current user's ID
          .getOne(); // Use getOne() to return a single record
    
        if (!client) {
          throw new Error('Client not found'); // Or a custom error
        }
    
        return client;
      }


}
import { Body, Controller, Get, Patch, Req } from "@nestjs/common";
import { ClientServices } from "../services/client.service";
import { Client } from "../entities/client.entity";

@Controller('client')
export class ClientController {
    constructor(
        private readonly clientService: ClientServices
    ){}

    @Get('me')
    async getClientDetails(@Req() req): Promise<any>{
        const userId = req.user.id;
        const clientDetails = await this.clientService.getClientDetailsForAuthenticatedUser(userId)
        return clientDetails
    }

    @Patch()
    async updateClient(@Req() req,  @Body() body: any,): Promise<Client>{
        const userId = req.user.id;
        const updatedDetails = await this.clientService.updateClientDetails(userId, body)
        return updatedDetails
    }
}
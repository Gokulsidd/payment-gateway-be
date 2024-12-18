import { Controller, Get, Req } from "@nestjs/common";
import { ClientServices } from "../services/client.service";

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
}
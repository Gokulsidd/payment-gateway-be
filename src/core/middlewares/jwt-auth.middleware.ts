import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: any, res: any, next: () => void) {
    // Correctly access the 'authorization' header
    const authHeader = req.headers['authorization'] || req.get('authorization'); // Use req.headers here
    console.log('Authorization Header:', authHeader);

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    // Split the token from "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // Verify the token
      console.log('Token:', token);
      console.log(process.env.JWT_SECRET)
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'defaultSecret',
      });
      console.log('Decoded Token:', decoded);

      // Attach user details to the request object
      req.user = decoded;
      next();
    } catch (err) {
        console.error('JWT Verification Error:', err.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

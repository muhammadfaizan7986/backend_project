import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/jwt.constant';
import { AdminService } from 'src/modules/admin/admin.service';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    // No authorization header
    if (!authorization) {
      throw new ForbiddenException('Authorization token is missing');
    }

    // Split authorization header into Bearer and token parts
    const parts = authorization.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new ForbiddenException('Invalid authorization format');
    }

    const token = parts[1];

    if (!token) {
      throw new ForbiddenException('Authorization token is missing');
    }

    try {
      // Validate JWT token

      const decoded = this.jwtService.verify(token, {
        algorithms: ['RS256'],
        publicKey: process.env.PUBLIC_KEY || jwtConstants.publicKey,
      });

      // Check if user is present and has a wallet address
      const authUser = decoded?.verified_credentials?.find(
        (item) => item.address,
      );

      if (!authUser) {
        throw new ForbiddenException('User does not have a valid address');
      }

      // Check if the user is an admin by wallet address
      const admin = await this.adminService.adminModel.findOne({
        walletAddress: { $regex: new RegExp(authUser?.walletAddress, 'i') },
      });

      if (!admin) {
        throw new ForbiddenException('User is not an admin');
      }

      // Attach user data to the request object
      request.user = decoded;
      return true;
    } catch (error) {
      // Log and handle JWT errors explicitly
      console.log(error, 'error');
      throw new ForbiddenException('Invalid or expired token');
    }
  }
}

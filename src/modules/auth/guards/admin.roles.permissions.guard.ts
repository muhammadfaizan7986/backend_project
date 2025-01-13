import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { AdminService } from 'src/modules/admin/admin.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AdminRolesPermissionsGuard implements CanActivate {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      const authUser = user?.verified_credentials?.find((item) => item.address);
      const admin = await this.userService.findAdmin({
        walletAddress: { $regex: new RegExp(authUser?.address, 'i') },
      });

      request.admin = admin ?? null;
      // console.log('admin',admin)
      return true;
    } catch (error) {
      // Log and handle JWT errors explicitly
      console.log(error, 'error');
      throw new ForbiddenException('Invalid or expired token');
    }
  }
}

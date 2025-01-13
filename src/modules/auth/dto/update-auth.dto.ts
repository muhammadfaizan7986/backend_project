import { UserDocument } from 'src/modules/user/entities/user.entity';

export class SignOutResult {
  success?: boolean;
  user?: Partial<UserDocument>;
  access_token?: string;
  message?: string;
  isVerified?: boolean;
}

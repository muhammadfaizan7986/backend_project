// auth/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './entities/user.entity';
import { DB_COLLECTIONS } from 'src/constants/collections';
import * as bcrypt from 'bcryptjs';
import { jwtConstants } from 'src/constants/jwt.constant';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectModel(DB_COLLECTIONS.USERS)
    readonly userModel: Model<UserDocument>,
  ) {}

  async seed(): Promise<any> {
    const limit: number = 50;
    const docs: any = [];
    for (let i = 0; i < limit; i++) {
      const email = `user_${i + 1}@sandbox.fantasyshowdown.com`;
      const password = await bcrypt.hash('Alpha@123', jwtConstants.salt);
      docs.push({
        email,
        loginType: 'local',
        fullName: `Sandbox User ${i + 1}`,
        yahooEmails: [email],
        isVerified: true,
        password,
        terms: true,
        teamSynced: true,
        allow_sync: false,
        yahooAccounts: [
          {
            sub: '6BEGC6DQNSQCYQRSZ3HCKTKHUI',
            name: 'Bradley Cooke',
            given_name: 'Bradley',
            family_name: 'Cooke',
            nickname: 'TheThirdComing',
            locale: 'en-US',
            email: 'jordanpedia@yahoo.com',
            email_verified: true,
            birthdate: '1981',
            profile_images: {
              image32:
                'https://s.yimg.com/ag/images/d8e12c5f-a66c-4e73-989f-3f8c34d13765_32sq.jpg',
              image64:
                'https://s.yimg.com/ag/images/d8e12c5f-a66c-4e73-989f-3f8c34d13765_64sq.jpg',
              image128:
                'https://s.yimg.com/ag/images/d8e12c5f-a66c-4e73-989f-3f8c34d13765_128sq.jpg',
              image192:
                'https://s.yimg.com/ag/images/d8e12c5f-a66c-4e73-989f-3f8c34d13765_192sq.jpg',
            },
            picture:
              'https://s.yimg.com/ag/images/d8e12c5f-a66c-4e73-989f-3f8c34d13765_192sq.jpg',
            accessToken:
              'AMntEbmfo1zkISfa3cNrXEqC9.z.F1l2TsqPT1atC4wdRR2IIPnS1Jce5uBALZJiMmpDFcSPUDBK0vh9e80HZv2vh3NAbtOI6CEdqvvDjTiUKL1B8M3YTfTY_BT6Z8QDnkSy0HcDKX3.NdoGrp3TZ5Ku62KfTdbeN7Ukan68JeIfcZXlQBjKY7MXHctQP1ogpY5fMk5nwMLmFzUG9L1DTfp6keYBWtIAe8o5GpgVJbg04Pl4czjnH2yYDoiNIz5bZAN638dINKQEU7jA0mW4N_xhSI3eVRahqoC1dPNCp2O13yMM9WlBd5cOju7xt5hRTHGMEdNyJfc7s8JK8QsI3oAxEO.7ybsK7j_1rIRm2yj8U6RYv6Gz2TA747e4Xy6O3CEH4KuYdx89QUQi6JnFKhiUvfgdGsbaXR0jFCYnXb8RjwDZmvzC.zl2yUhLGowPPDZr1hleIo1iljsr21RnzHJkgUvFlaVdmRPmJztXuNTzSkPguN7fSQC1715fzjwnliAilKTAq53cTvxnOhmQSsi5oklkvSJ400tfRF2iQLhcyHZajex.4ATeyH1G1L7y46xfKactizccyB75SU7JZQ.h0As700jH_BbZqFLXd4UVJtaeYBl81eg5nBe0CEdByec8B.uIAIjJsIyx3ORk7_wZfw0Jrey4ut8aB2JqcpTcN6Ckt1xgT.vN7PmHVT92T7jz.3O7rKvJRmdWi6DWai.iDIyI5hHm08bEjGZ519SHe3fSm1Jt2pLCLf7YEgHW_GodIN.RjbXabXy9CO9l5zrd5.G0YBGDopn5kBjwM6COSeItbdm_meDlFqS4lezJ2.kXYlCWWH_dHt1.xhsTP5FX.Ta5hma268RSGuajpTpJYzXeKF_2FUfmUmtcW0n3pMhUCMrUaXgypNqbOYUqnJycGmhC777h2Dk8J6w05nats6n642as_2yk_qo0mIISHlH6guzHSXQTqfSlA9B2hPgQXRjP4nfOZfg-',
            refreshToken:
              'APUeCWeBYqNai_9db.hxQ0FIti52~001~75lZHkcJ5cWZyLwEt5myuWE-',
            expiresAt: 1730145225333,
          },
        ],
      });
    }
    return this.userModel.insertMany(docs);
  }

  async drop(): Promise<any> {
    return this.userModel.deleteMany({});
  }
}

import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './modules/user/entities/user.entity';
import { DB_COLLECTIONS } from 'src/constants/collections';

import { UserSeeder } from './modules/user/user.seeder.';

seeder({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://fantasyshowdown:HyDzrh2hLag6vSCI@prim.g59i2.mongodb.net/local_db',
    ),
    MongooseModule.forFeature([
      { name: DB_COLLECTIONS.USERS, schema: UserSchema },
    ]),
  ],
}).run([UserSeeder]);

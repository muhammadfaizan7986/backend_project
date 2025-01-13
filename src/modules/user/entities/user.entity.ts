import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { jwtConstants } from 'src/constants/jwt.constant';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String })
  profileImage: string;

  @Prop({ type: String })
  yahooId: string;

  @Prop()
  fullName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ required: false })
  password: string;

  @Prop()
  hash: string;

  // @Prop({ required: true, default: false })
  // terms: boolean;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  async checkPassword(password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (error, isMatch) => {
        if (error) {
          reject(error);
        }
        resolve(isMatch);
      });
    });
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

// Middleware to hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const hash = await bcrypt.hash(this.password, jwtConstants.salt);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to exclude password from JSON response
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.yahooAccessToken;
  return obj;
};

// Error handling for unique fields
UserSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error(`${Object.keys(error.keyValue)[0]} must be unique`));
  } else {
    next(error);
  }
});

UserSchema.methods.checkPassword = User.prototype.checkPassword;

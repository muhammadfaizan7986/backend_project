import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type VerificationDocument = Verification & Document;

@Schema({ timestamps: true })
export class Verification {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop()
  code: string;

  @Prop({
    default: false,
  })
  isVerified: boolean;

  @Prop()
  expiry: number;

  @Prop()
  type: string;

  @Prop({
    default: 0,
  })
  attempts: number;

  @Prop({ type: Date })
  createdAt?: Date;

  @Prop({ type: Date })
  updatedAt?: Date;
}

export const VerificationSchema = SchemaFactory.createForClass(Verification);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Admin {
  @Prop()
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: [String], required: true, default: ['superadmin'] })
  roles: string[];

  @Prop()
  profileImage: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String })
  walletAddress: string;
}

export type AdminDocument = Admin & Document;
export const AdminSchema = SchemaFactory.createForClass(Admin);

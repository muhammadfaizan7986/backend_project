import { FilterQuery, Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Verification,
  VerificationDocument,
} from './entities/verification.entity';
import { DB_COLLECTIONS } from 'src/constants/collections';
import { EXPIRATION_TIME_MS } from './verification.constants';

@Injectable()
export class VerificationService {
  constructor(
    @InjectModel(DB_COLLECTIONS.VERIFICATIONS)
    private verificationModel: Model<VerificationDocument>,
  ) {}

  async createCode(code: number, userId: Types.ObjectId, type?: string) {
    let verification = await this.verificationModel.findOneAndUpdate(
      { userId: userId },
      {
        expiry: new Date().getTime() + EXPIRATION_TIME_MS,
        isVerified: false,
        code: code,
        type: type,
        attempts: 0,
      },
    );
    if (!verification) {
      verification = await this.verificationModel.create({
        userId: userId,
        expiry: new Date().getTime() + EXPIRATION_TIME_MS,
        isVerified: false,
        code: code,
        type: type,
      });
    }
    return verification;
  }

  async findByUserId(userId: string) {
    const verification = await this.verificationModel.findOne({
      userId: userId,
    });
    if (!verification) {
      throw new Error('`Session expired try again.`');
    }
    return verification;
  }

  async findOne(query: FilterQuery<VerificationDocument>) {
    return this.verificationModel.findOne(query);
  }

  async create(data: Verification) {
    return this.verificationModel.create(data);
  }

  async findOneAndUpdate(
    filter: { _id: string }, // Explicitly include `_id` in the filter type
    update: Partial<Verification>,
    options?: { new: boolean },
  ): Promise<Verification | null> {
    return this.verificationModel
      .findOneAndUpdate(filter, update, options)
      .exec();
  }

  async verifyCode(data: { userId: string; code: string }) {
    const { userId, code } = data;

    const verification = await this.findByUserId(userId);
    if (verification.attempts > 2) {
      throw new Error(
        'You have already made 3 attempts please retry after 24 hours',
      );
    } else {
      if (verification.code === code) {
        await this.verificationModel.findOneAndUpdate(
          { _id: verification._id },
          { isVerified: true },
          { new: true },
        );
        return { success: true };

        // const mailRes = await Mailer.sendForgotPasswordEmail(email, code);
      } else {
        verification.attempts = verification.attempts + 1;
        await verification.save();
        throw new Error('Incorrect pin entered');
      }
    }
  }
}

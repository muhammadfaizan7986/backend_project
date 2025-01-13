// auth/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './entities/user.entity';
import { DB_COLLECTIONS } from 'src/constants/collections';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { paginate } from 'src/utils/pagination.util';
import { AdminDocument } from '../admin/entities/admin.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(DB_COLLECTIONS.USERS)
    readonly userModel: Model<UserDocument>,
    @InjectModel(DB_COLLECTIONS.ADMIN)
    readonly adminModel: Model<AdminDocument>,
  ) {}

  create(data): Promise<UserDocument> {
    return this.userModel.create(data);
  }

  async findOne(clause: {
    [key: string]: unknown;
  }): Promise<UserDocument | undefined> {
    return this.userModel.findOne(clause).exec();
  }

  async findAdmin(clause: {
    [key: string]: unknown;
  }): Promise<AdminDocument | undefined> {
    return this.adminModel.findOne(clause).exec();
  }

  async findAll(filter: PaginationDto, page, limit) {
    const query = {};
    Object.keys(filter).forEach((key) => {
      if (filter[key]) {
        query[key] = { $regex: filter[key], $options: 'i' };
      }
    });
    return paginate(this.userModel, query, {
      page,
      limit,
      sort: { _id: -1 },
    });
  }

  async findUserById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async deleteUser(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}

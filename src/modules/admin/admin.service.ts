import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DB_COLLECTIONS } from 'src/constants/collections';
import { Admin, AdminDocument } from './entities/admin.entity';
import { Model } from 'mongoose';
import { AdminDto } from './dto/admin.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/constants/jwt.constant';

@Injectable()
export class AdminService {
  private readonly saltRounds = jwtConstants.salt;
  private readonly jwtSecret = jwtConstants.secret;

  constructor(
    @InjectModel(DB_COLLECTIONS.ADMIN) public adminModel: Model<AdminDocument>,
  ) {}

  async createAdmin(adminDto: AdminDto): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(
      adminDto.password,
      this.saltRounds,
    );
    const createdAdmin = new this.adminModel({
      ...adminDto,
      password: hashedPassword,
    });
    return createdAdmin.save();
  }

  async login(adminDto: AdminDto): Promise<{ token: string }> {
    const admin = await this.adminModel
      .findOne({ email: adminDto.email })
      .exec();
    if (!admin || !(await bcrypt.compare(adminDto.password, admin.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = jwt.sign({ email: admin.email }, this.jwtSecret, {
      expiresIn: jwtConstants.expire,
    });

    console.log('JWT Token from Controller:', token);
    return { token };
  }

  async resetPassword(email: string, newPassword: string): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(newPassword, this.saltRounds);
    return this.adminModel
      .findOneAndUpdate({ email }, { password: hashedPassword }, { new: true })
      .exec();
  }

  async findOneByEmail(email: string): Promise<Admin | null> {
    return this.adminModel.findOne({ email }).exec();
  }

  async updateAdmin(id: string, adminDto: AdminDto): Promise<Admin> {
    const admin = await this.adminModel.findById(id).exec();
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    if (adminDto.password) {
      adminDto.password = await bcrypt.hash(adminDto.password, this.saltRounds);
    }

    return this.adminModel
      .findOneAndUpdate({ _id: id }, { $set: adminDto }, { new: true })
      .exec();
  }

  async deleteAdmin(id: string): Promise<{ message: string }> {
    const admin = await this.adminModel.findById(id).exec();
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    await this.adminModel.deleteOne({ _id: id }).exec();
    return { message: 'Admin deleted successfully' };
  }
}

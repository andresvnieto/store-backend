import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateUserDto,
  FilterUsersDto,
  UpdateUserDto,
} from '../dtos/users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(filterParams: FilterUsersDto) {
    if (filterParams) {
      const filters: FilterQuery<User> = {};
      const { limit, offset } = filterParams;
      const users = await this.userModel
        .find(filters)
        .skip(offset)
        .limit(limit)
        .populate('brand');
      return users;
    }
    return await this.userModel.find().populate('brand').exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('El usuario:' + id + 'no existe');
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user)
      throw new NotFoundException('El usuario: ' + email + 'no existe');
    return user;
  }

  async create(user: CreateUserDto) {
    const newUser = new this.userModel({
      ...user,
    });
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(newUser.password, saltOrRounds);
    newUser.password = hashPassword;
    const model = await newUser.save();
    const { password, ...rta } = model.toJSON();
    return rta;
  }

  async updateOne(id: any, dataUser: UpdateUserDto) {
    const userExist = await this.userModel.findByIdAndUpdate(
      { _id: id },
      dataUser,
      { new: true },
    );
    return userExist;
  }

  async deleteOne(id: any) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('El usero:' + id + 'no existe');
    return await this.userModel.findByIdAndDelete(id);
  }
}

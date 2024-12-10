import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  8;
  private readonly logger = new Logger('UsersService');

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.userModel(createUserDto);
      return await newUser.save();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(id: string) {
    try {
      return this.userModel.findById(id).exec();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(
          id,
          { $set: updateUserDto },
          { new: true, runValidators: true },
        )
        .exec();
      if (!updatedUser) {
        throw new BadRequestException(`User not found`);
      }
      return updatedUser;
    } catch (error) {
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        throw new BadRequestException(`User not found`);
      }
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    this.logger.error(error.detail || error.message || error);
    throw new BadRequestException(error.detail || error.message || error);
  }
}

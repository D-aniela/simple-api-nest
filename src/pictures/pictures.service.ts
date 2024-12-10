import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Picture } from './model/picture.model';
import { CreatePictureDto } from './dto/create-picture.dto';

@Injectable()
export class PicturesService {
  private readonly logger = new Logger('PicturesService');

  constructor(
    @InjectModel('Picture') private readonly pictureModel: Model<Picture>,
  ) {}

  async create(picture: CreatePictureDto): Promise<Picture> {
    try {
      console.log('hello');
      const newPicture = new this.pictureModel(picture);
      return await newPicture.save();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    this.logger.error(error.detail || error.message || error);
    throw new BadRequestException(error.detail || error.message || error);
  }
}

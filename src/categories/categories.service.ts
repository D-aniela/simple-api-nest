import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from './model/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger('CategoriesService');

  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const newCategory = new this.categoryModel(createCategoryDto);
      return await newCategory.save();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async limitCategories() {
    return await this.categoryModel.find().limit(5).exec();
  }

  async findAll() {
    try {
      return await this.categoryModel.find().exec();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async getCategoriesCatalog() {
    try {
      const categories = await this.categoryModel.find().select('name').exec();
      return categories.map((category) => {
        return { _id: category._id, label: category.name };
      });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(id: string) {
    try {
      // return just the picture.url
      return await this.categoryModel
        .findById(id)
        .populate('picture', 'url')
        .exec();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, {
        new: true,
      });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }

  private handleExceptions(error: any) {
    this.logger.error(error.detail || error.message || error);
    throw new BadRequestException(error.detail || error.message || error);
  }
}

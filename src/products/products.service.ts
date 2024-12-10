import { Injectable, BadRequestException, Logger } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './model/product.model';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('CategoriesService');

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const newProduct = new this.productModel(createProductDto);
      return await newProduct.save();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    try {
      return await this.productModel.find().populate('picture', 'url').exec();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.productModel
        .findById(id)
        .populate('picture', 'url')
        .exec();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.productModel
        .findByIdAndUpdate(
          id,
          { $set: updateProductDto },
          { new: true, runValidators: true },
        )
        .exec();
      if (!updatedProduct) {
        throw new BadRequestException(`Product not found`);
      }
      return updatedProduct;
    } catch (error) {
      if (error.name === 'CastError' && error.kind === 'ObjectId') {
        throw new BadRequestException(`Product not found`);
      }
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    this.logger.error(error.detail || error.message || error);
    throw new BadRequestException(error.detail || error.message || error);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PicturesService } from 'src/pictures/pictures.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private cloudinary: CloudinaryService,
    private picturesService: PicturesService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    const img = await this.cloudinary.uploadImage(file);
    // create picture
    const { _id }: any = await this.picturesService.create({
      url: img.url,
      format: img.format,
    });
    const product = await this.productsService.create({
      ...createProductDto,
      picture: _id,
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product created',
      data: product,
    };
  }

  @Get()
  async findAll() {
    const products = await this.productsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Products fetched successfully',
      data: products,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product fetched successfully',
      data: product,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productsService.update(id, updateProductDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Product updated successfully',
      data: product,
    };
  }
}

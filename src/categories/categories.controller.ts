import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PicturesService } from 'src/pictures/pictures.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private cloudinary: CloudinaryService,
    private picturesService: PicturesService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response,
    @Body() body: CreateCategoryDto,
  ) {
    const img = await this.cloudinary.uploadImage(file);
    // create picture
    const { _id }: any = await this.picturesService.create({
      url: img.url,
      format: img.format,
    });
    const data = await this.categoriesService.create({
      name: body.name,
      description: body.description,
      picture: _id,
    });
    return response.status(HttpStatus.CREATED).json({
      statusCode: 201,
      message: 'Category created',
      data,
    });
  }

  @Get()
  async findAll(@Res() response: Response) {
    const data = await this.categoriesService.findAll();
    return response.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'Totals Categories fetched successfully',
      data,
    });
  }

  @Get('/limitCategories')
  limitCategories() {
    return this.categoriesService.limitCategories();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategorySchema } from './model/category.model';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { PicturesModule } from 'src/pictures/pictures.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    CloudinaryModule,
    PicturesModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}

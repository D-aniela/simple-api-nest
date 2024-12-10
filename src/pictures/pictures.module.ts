import { Module } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';
import { PictureSchema } from './model/picture.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Picture', schema: PictureSchema }]),
  ],
  controllers: [PicturesController],
  providers: [PicturesService],
  exports: [PicturesService],
})
export class PicturesModule {}

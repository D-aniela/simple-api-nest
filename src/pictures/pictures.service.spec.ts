import { Test, TestingModule } from '@nestjs/testing';
import { PicturesService } from './pictures.service';
import { Model } from 'mongoose';
import { Picture } from './model/picture.model';
import { getModelToken } from '@nestjs/mongoose';

describe('PicturesService', () => {
  let service: PicturesService;
  let pictureModel: Model<Picture>;

  const mockPictureModel = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PicturesService,
        {
          provide: getModelToken('Picture'),
          useValue: mockPictureModel
        },
      ],
    }).compile();

    service = module.get<PicturesService>(PicturesService);
    pictureModel = module.get<Model<Picture>>(getModelToken('Picture'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

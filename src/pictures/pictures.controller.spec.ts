import { Test, TestingModule } from '@nestjs/testing';
import { PicturesController } from './pictures.controller';
import { PicturesService } from './pictures.service';

describe('PicturesController', () => {
  let controller: PicturesController;
  let picturesService: PicturesService;

  const mockPicturesService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PicturesController],
      providers: [
        {
          provide: PicturesService,
          useValue: mockPicturesService
        }
    ],
    }).compile();

    controller = module.get<PicturesController>(PicturesController);
    picturesService = module.get<PicturesService>(PicturesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryProvider } from './cloudinary';
import { CLOUDINARY } from './constants';

describe('Cloudinary', () => {
  let provider: typeof CLOUDINARY;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudinaryProvider],
    }).compile();

    provider = module.get<typeof CLOUDINARY>(CLOUDINARY);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

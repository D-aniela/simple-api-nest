import { IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  // @IsString()
  // @Length(1, 100)
  readonly name: string;
  // @IsString()
  // @Length(1, 255)
  readonly description: string;
  readonly picture: string;
}

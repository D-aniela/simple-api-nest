import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsDate,
  IsBoolean,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @Type(() => Date) // Transforma cadenas en instancias de Date
  @IsDate()
  birthdate: Date;

  @IsOptional() // Permite que el campo no esté presente
  @IsMongoId({ message: 'address must be a valid MongoId' })
  @IsBoolean({ message: 'address must be a boolean value' })
  address?: string | false;

  @IsBoolean()
  active: boolean;
}

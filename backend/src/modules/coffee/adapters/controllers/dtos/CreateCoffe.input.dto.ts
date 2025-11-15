import { Type } from 'class-transformer';

import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

import { CoffeeType } from 'src/modules/coffee/domains/Coffee.domain';
import { CreateCoffeeInput } from 'src/modules/coffee/app/interfaces/create-coffee-input.interface';

export class CreateCoffeeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long.' })
  name: string;

  @IsNotEmpty()
  @IsEnum(CoffeeType)
  type: CoffeeType;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a valid number with up to 2 decimal places.' },
  )
  price: number;

  @IsNotEmpty()
  @IsString()
  @IsUrl(
    { require_protocol: true },
    { message: 'imageUrl must be a valid URL.' },
  )
  imageUrl: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  static toInput(dto: CreateCoffeeDto): CreateCoffeeInput {
    return {
      name: dto.name,
      type: dto.type,
      imageUrl: dto.imageUrl,
      description: dto.description,
      price: dto.price,
    } satisfies CreateCoffeeInput;
  }
}

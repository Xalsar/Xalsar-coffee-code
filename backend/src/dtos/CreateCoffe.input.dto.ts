import { Type } from 'class-transformer';

import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

import { CoffeeType } from 'src/types/CoffeeType.type';

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
}

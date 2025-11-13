import { Inject, Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from 'src/dtos/CreateCoffe.input.dto';
import { CoffeeAlreadyExistsError } from 'src/errors/CoffeAlreadyExists.error';
import { CoffeeService } from 'src/services/coffe.service';

@Injectable()
export class CreateCoffeeUseCase {
  constructor(
    @Inject(CoffeeService)
    private coffeeService: CoffeeService,
  ) {}

  async execute(createCoffeeDto: CreateCoffeeDto) {
    const existingCoffee = await this.coffeeService.findByName(
      createCoffeeDto.name,
    );

    if (existingCoffee) {
      throw new CoffeeAlreadyExistsError(
        'Coffee with this name already exists.',
      );
    }

    return this.coffeeService.createCoffee(createCoffeeDto);
  }
}

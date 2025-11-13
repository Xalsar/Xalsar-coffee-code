import { Inject, Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from 'src/dtos/CreateCoffe.input.dto';
import { CoffeeAlreadyExistsError } from 'src/errors/CoffeAlreadyExists.error';
import { CoffeeRepository } from 'src/repositories/Coffee.repository';

@Injectable()
export class CreateCoffeeUseCase {
  constructor(
    @Inject(CoffeeRepository)
    private coffeeRepository: CoffeeRepository,
  ) {}

  async execute(createCoffeeDto: CreateCoffeeDto) {
    const existingCoffee = await this.coffeeRepository.findByName(
      createCoffeeDto.name,
    );

    if (existingCoffee) {
      throw new CoffeeAlreadyExistsError(
        'Coffee with this name already exists.',
      );
    }

    return this.coffeeRepository.createCoffee(createCoffeeDto);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { CoffeeAlreadyExistsException } from 'src/modules/coffee/app/usecases/exceptions/CoffeAlreadyExists.error';
import { CoffeeRepository } from 'src/modules/coffee/adapters/repositories/coffee.repository';

import { CoffeeType } from 'src/modules/coffee/domains/Coffee.domain';
import { CreateCoffeeInput } from '../interfaces/create-coffee-input.interface';

@Injectable()
export class CreateCoffeeUseCase {
  constructor(
    @Inject(CoffeeRepository)
    private coffeeRepository: CoffeeRepository,
  ) {}

  async execute(createCoffeeDto: CreateCoffeeInput) {
    const existingCoffee = await this.coffeeRepository.findByName(
      createCoffeeDto.name,
    );

    if (existingCoffee) {
      throw new CoffeeAlreadyExistsException(createCoffeeDto.name);
    }

    return this.coffeeRepository.createCoffee(createCoffeeDto);
  }
}

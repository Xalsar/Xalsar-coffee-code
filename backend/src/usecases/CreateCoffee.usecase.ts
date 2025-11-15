import { Inject, Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from 'src/dtos/CreateCoffe.input.dto';
import { CoffeeAlreadyExistsException } from 'src/exceptions/CoffeAlreadyExists.error';
import { CoffeeRepository } from 'src/repositories/Coffee.repository';
import { CoffeeDomain } from 'src/domains/Coffee.domain';

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
      throw new CoffeeAlreadyExistsException(createCoffeeDto.name);
    }

    return this.coffeeRepository.createCoffee(
      CreateCoffeeDto.toDomain(createCoffeeDto),
    );
  }
}

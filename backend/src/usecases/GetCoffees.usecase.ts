import { Injectable } from '@nestjs/common';
import { CoffeeRepository } from 'src/repositories/Coffee.repository';

@Injectable()
export class GetCoffeesUseCase {
  constructor(private coffeeRepository: CoffeeRepository) {}
  execute() {
    return this.coffeeRepository.getAllCoffees();
  }
}

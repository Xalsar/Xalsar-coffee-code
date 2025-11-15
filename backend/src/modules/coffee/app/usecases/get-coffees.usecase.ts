import { Injectable } from '@nestjs/common';
import { CoffeeRepository } from 'src/modules/coffee/adapters/repositories/coffee.repository';
import { CoffeeDomain } from '../../domains/Coffee.domain';

@Injectable()
export class GetCoffeesUseCase {
  constructor(private coffeeRepository: CoffeeRepository) {}
  execute(): Promise<CoffeeDomain[]> {
    return this.coffeeRepository.getAllCoffees();
  }
}

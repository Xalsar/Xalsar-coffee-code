import { Injectable } from '@nestjs/common';
import { CoffeeService } from 'src/services/coffe.service';

@Injectable()
export class GetCoffeesUseCase {
  constructor(private coffeeService: CoffeeService) {}

  execute() {
    return this.coffeeService.getAllCoffees();
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';

import { GetCoffeesUseCase } from './usecases/GetCoffees.usecase';
import { CreateCoffeeUseCase } from './usecases/CreateCoffee.usecase';

import { CreateCoffeeDto } from './dtos/CreateCoffe.input.dto';

@Controller()
export class AppController {
  constructor(
    private getCoffeesUseCase: GetCoffeesUseCase,
    private createCoffeeUseCase: CreateCoffeeUseCase,
  ) {}

  @Get()
  getItems() {
    return this.getCoffeesUseCase.execute();
  }

  @Post()
  async createCoffee(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.createCoffeeUseCase.execute(createCoffeeDto);
  }
}

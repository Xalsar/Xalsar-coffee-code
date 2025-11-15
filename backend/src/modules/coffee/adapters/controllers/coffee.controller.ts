import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetCoffeesUseCase } from '../../app/usecases/get-coffees.usecase';
import { CreateCoffeeUseCase } from '../../app/usecases/create-coffee.usecase';
import { CreateCoffeeDto } from './dtos/CreateCoffe.input.dto';

@Controller('coffees')
export class CoffeeController {
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
    return this.createCoffeeUseCase.execute(
      CreateCoffeeDto.toInput(createCoffeeDto),
    );
  }
}

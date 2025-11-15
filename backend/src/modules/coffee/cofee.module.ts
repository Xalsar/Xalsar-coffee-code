import { Module } from '@nestjs/common';
import { CoffeeController } from './adapters/controllers/coffee.controller';
import { CoffeeRepository } from './adapters/repositories/coffee.repository';
import { GetCoffeesUseCase } from './app/usecases/get-coffees.usecase';
import { CreateCoffeeUseCase } from './app/usecases/create-coffee.usecase';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  imports: [],
  controllers: [CoffeeController],
  providers: [
    CoffeeRepository,
    GetCoffeesUseCase,
    CreateCoffeeUseCase,
    PrismaService,
  ],
})
export class CoffeeModule {}

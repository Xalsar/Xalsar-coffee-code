import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoffeeRepository } from './repositories/Coffee.repository';
import { PrismaService } from './services/prisma.service';
import { GetCoffeesUseCase } from './usecases/GetCoffees.usecase';
import { CreateCoffeeUseCase } from './usecases/CreateCoffee.usecase';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    CoffeeRepository,
    PrismaService,
    GetCoffeesUseCase,
    CreateCoffeeUseCase,
  ],
})
export class AppModule {}

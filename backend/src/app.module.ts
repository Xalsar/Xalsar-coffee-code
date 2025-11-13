import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoffeeService } from './services/coffe.service';
import { PrismaService } from './services/prisma.service';
import { GetCoffeesUseCase } from './usecases/GetCoffees.usecase';
import { CreateCoffeeUseCase } from './usecases/CreateCoffee.usecase';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    CoffeeService,
    PrismaService,
    GetCoffeesUseCase,
    CreateCoffeeUseCase,
  ],
})
export class AppModule {}

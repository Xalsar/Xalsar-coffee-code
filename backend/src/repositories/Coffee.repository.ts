import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

import { Coffee } from 'generated/prisma/client';
import { CoffeeDomain } from 'src/domains/Coffee.domain';

@Injectable()
export class CoffeeRepository {
  constructor(private prisma: PrismaService) {}

  async findByName(name: string): Promise<Coffee | null> {
    return this.prisma.coffee.findUnique({
      where: { name },
    });
  }

  async getAllCoffees(): Promise<Coffee[]> {
    return this.prisma.coffee.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async createCoffee({
    name,
    type,
    description,
    imageUrl,
    price,
  }: CoffeeDomain): Promise<CoffeeDomain> {
    const createdCoffee = await this.prisma.coffee.create({
      data: {
        name,
        type,
        description,
        imageUrl,
        price,
      },
    });

    return new CoffeeDomain({
      name: createdCoffee.name,
      type: createdCoffee.type,
      imageUrl: createdCoffee.imageUrl,
      description: createdCoffee.description,
      price: createdCoffee.price,
    });
  }
}

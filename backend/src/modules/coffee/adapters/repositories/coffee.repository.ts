import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

import { CoffeeDomain } from 'src/modules/coffee/app/domains/Coffee.domain';

@Injectable()
export class CoffeeRepository {
  constructor(private prisma: PrismaService) {}

  async findByName(name: string): Promise<CoffeeDomain | null> {
    const foundCoffee = await this.prisma.coffee.findUnique({
      where: { name },
    });

    if (!foundCoffee) {
      return null;
    }

    return new CoffeeDomain({
      name: foundCoffee?.name,
      type: foundCoffee?.type,
      imageUrl: foundCoffee?.imageUrl,
      description: foundCoffee?.description,
      price: foundCoffee?.price,
      id: foundCoffee?.id,
    });
  }

  async getAllCoffees(): Promise<CoffeeDomain[]> {
    const foundCoffees = await this.prisma.coffee.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return foundCoffees.map(
      (coffee) =>
        new CoffeeDomain({
          name: coffee.name,
          type: coffee.type,
          imageUrl: coffee.imageUrl,
          description: coffee.description,
          price: coffee.price,
          id: coffee.id,
        }),
    );
  }

  async createCoffee({
    name,
    type,
    description,
    imageUrl,
    price,
  }: Omit<CoffeeDomain, 'id'>): Promise<CoffeeDomain> {
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
      id: createdCoffee.id,
    });
  }
}

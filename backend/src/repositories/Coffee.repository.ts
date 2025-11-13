import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

import { Coffee } from 'generated/prisma/client';

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
    price,
  }: {
    name: string;
    type: 'ARABICA' | 'ROBUSTA';
    description?: string;
    price: number;
  }): Promise<Coffee> {
    return this.prisma.coffee.create({
      data: {
        name,
        type,
        description,
        price,
      },
    });
  }
}

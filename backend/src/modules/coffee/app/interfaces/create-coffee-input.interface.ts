import { CoffeeType } from 'src/modules/coffee/domains/Coffee.domain';

export interface CreateCoffeeInput {
  name: string;
  description: string;
  type: CoffeeType;
  imageUrl: string;
  price: number;
}

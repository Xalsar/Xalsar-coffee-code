import { CoffeeType } from 'src/modules/coffee/app/domains/Coffee.domain';

export interface CreateCoffeeInput {
  name: string;
  description: string;
  type: CoffeeType;
  imageUrl: string;
  price: number;
}

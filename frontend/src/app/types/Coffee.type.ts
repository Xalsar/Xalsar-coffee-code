import { CoffeeType } from "./CoffeeType.type";

export type Coffee = {
  id: number;
  name: string;
  type: CoffeeType;
  description: string;
  price: number;
};

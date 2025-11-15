export const CoffeeType = {
  ARABICA: 'ARABICA',
  ROBUSTA: 'ROBUSTA',
};

export type CoffeeType = keyof typeof CoffeeType;

export class CoffeeDomain {
  id: number;
  name: string;
  type: CoffeeType;
  imageUrl: string;
  description: string;
  price: number;

  constructor(entity: CoffeeDomain) {
    this.id = entity.id;
    this.name = entity.name;
    this.type = entity.type;
    this.imageUrl = entity.imageUrl;
    this.description = entity.description;
    this.price = entity.price;
  }
}

export type CoffeeType = 'ARABICA' | 'ROBUSTA';

export class CoffeeDomain {
  name: string;
  type: CoffeeType;
  imageUrl: string;
  description: string;
  price: number;

  constructor(entity: CoffeeDomain) {
    this.name = entity.name;
    this.type = entity.type;
    this.imageUrl = entity.imageUrl;
    this.description = entity.description;
    this.price = entity.price;
  }
}

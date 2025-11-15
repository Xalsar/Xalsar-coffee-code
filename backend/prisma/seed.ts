import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { CoffeeType } from '../generated/prisma/client';

const prisma = new PrismaClient();

const coffeeData = [
  {
    name: 'Classic Espresso',
    type: CoffeeType.ARABICA,
    price: 3.5,
    description:
      'A rich, concentrated shot of premium Arabica beans, forming the base of many drinks.',
    imageUrl: 'https://example.com/classic-espresso.jpg',
  },
  {
    name: 'Bold Sumatra',
    type: CoffeeType.ROBUSTA,
    price: 4.0,
    description:
      'Intense and earthy Robusta with a strong, dark finish and high caffeine content.',
    imageUrl: 'https://example.com/classic-espresso.jpg',
  },
  {
    name: 'Ethiopian Yirgacheffe',
    type: CoffeeType.ARABICA,
    price: 5.5,
    description:
      'Floral, fruity, and complex, a highly-regarded single-origin Arabica.',
    imageUrl: 'https://example.com/classic-espresso.jpg',
  },
  {
    name: 'Vietnamese Dark Roast',
    type: CoffeeType.ROBUSTA,
    price: 3.8,
    description:
      'A traditional dark roast Robusta, often used for Vietnamese iced coffee.',
    imageUrl: 'https://example.com/classic-espresso.jpg',
  },
  {
    name: 'Colombian Supremo',
    type: CoffeeType.ARABICA,
    price: 4.5,
    description:
      'A smooth, well-balanced, and bright Arabica with a medium body.',
    imageUrl: 'https://example.com/classic-espresso.jpg',
  },
  {
    name: 'Indian Cherry',
    type: CoffeeType.ROBUSTA,
    price: 3.2,
    description:
      'A robust and mildly acidic Robusta, often used in blending for body.',
    imageUrl: 'https://example.com/classic-espresso.jpg',
  },
  {
    name: 'Kenya AA',
    type: CoffeeType.ARABICA,
    price: 6.0,
    description:
      'Known for its vibrant, clean, and complex acidity with notes of blackcurrant.',
    imageUrl: 'https://example.com/classic-espresso.jpg',
  },
  {
    name: 'Ugandan Wugar',
    type: CoffeeType.ROBUSTA,
    price: 3.7,
    description:
      'A neutral, full-bodied Robusta that works well in espresso blends.',
    imageUrl: 'https://example.com/classic-espresso.jpg',
  },
  {
    name: 'Guatemalan Antigua',
    type: CoffeeType.ARABICA,
    price: 5.0,
    description:
      'Smoky, spicy, and full-bodied Arabica, grown at high altitudes.',
    imageUrl: 'https://example.com/classic-espresso.jpg',
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const c of coffeeData) {
    const coffee = await prisma.coffee.upsert({
      where: { name: c.name },
      update: { ...c },
      create: { ...c },
    });
    console.log(
      `Created or updated coffee with id: ${coffee.id} (${coffee.name})`,
    );
  }

  console.log(`Seeding finished. ${coffeeData.length} records processed.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

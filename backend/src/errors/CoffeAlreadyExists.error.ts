export class CoffeeAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CoffeeAlreadyExistsError';
  }
}

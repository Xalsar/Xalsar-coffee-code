import { ConflictException } from '@nestjs/common';

export class CoffeeAlreadyExistsException extends ConflictException {
  constructor(coffeeName: string) {
    super(`Coffee with this name already exists: ${coffeeName}`);
  }
}

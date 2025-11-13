import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ConflictException,
} from '@nestjs/common';
import { CoffeeAlreadyExistsError } from 'src/errors/CoffeAlreadyExists.error';

@Catch(CoffeeAlreadyExistsError)
export class DomainErrorFilter implements ExceptionFilter {
  catch(exception: CoffeeAlreadyExistsError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const httpException = new ConflictException(exception.message);

    response
      .status(httpException.getStatus())
      .json(httpException.getResponse());
  }
}

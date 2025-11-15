import { Module } from '@nestjs/common';
import { CoffeeModule } from './modules/coffee/cofee.module';

@Module({
  imports: [CoffeeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

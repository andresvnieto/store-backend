import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { ProductsModule } from 'src/products/products.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [ProductsModule, OrdersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

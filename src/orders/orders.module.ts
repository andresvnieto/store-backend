import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { ProductsModule } from 'src/products/products.module';
import {} from 'module';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderShema } from './entities/order.entity';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderShema,
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}

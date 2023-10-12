import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { CustomersModule } from './customers/customers.module';

const API_KEY = '123456';
const API_KEY_PROD = 'xyz';
@Module({
  imports: [
    UsersModule,
    ProductsModule,
    OrdersModule,
    CategoriesModule,
    BrandsModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
})
export class AppModule {}

import { Order } from 'src/orders/entities/order.entity';

export class User {
  id: number;
  name: string;
  email: string;
  orders: Order[];
}

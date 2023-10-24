import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dto';

@Injectable()
export class OrdersService {
  private counterId = 0;
  private orders: Order[] = [
    {
      id: 0,
      description: 'Lorem ipsum dolor',
      date: new Date(),
      products: [],
    },
  ];

  findAll(offset: number, limit: number) {
    const copyOrders = [...this.orders];

    console.log(offset, limit);

    if (offset > this.orders.length || offset < 0) {
      offset = 0;
    }

    if (limit + offset > this.orders.length) {
      limit = this.orders.length;
    }

    if (limit + offset < 0) limit = 0;

    const limitOrders = copyOrders.slice(offset, limit + offset);

    console.log(limitOrders);

    if (limitOrders.length > 0) {
      return limitOrders;
    } else {
      return this.orders;
    }
  }

  findOne(id: number) {
    const order = this.orders.find((item) => item.id === id);
    if (!order) throw new NotFoundException('El ordero:' + id + 'no existe');
    return order;
  }

  create(order: CreateOrderDto) {
    this.counterId = this.counterId + 1;
    const newOrder = {
      id: this.counterId,
      ...order,
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  updateOne(id: number, dataOrder: UpdateOrderDto) {
    const orderExist = this.findOne(id);
    if (orderExist) {
      const index = this.orders.findIndex((item) => item.id === id);
      const order = this.orders[index];
      const updatedOrder = { ...order, ...dataOrder };
      this.orders[index] = updatedOrder;
      return updatedOrder;
    } else {
      return null;
    }
  }

  deleteOne(id: number) {
    const orderExist = this.findOne(id);
    if (orderExist) {
      const newOrders = this.orders.filter((item) => {
        return item.id !== id;
      });
      this.orders = newOrders;
      return this.orders;
    } else {
      return null;
    }
  }
}

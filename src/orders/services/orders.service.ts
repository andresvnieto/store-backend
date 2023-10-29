import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateOrderDto,
  FilterOrdersDto,
  UpdateOrderDto,
} from '../dtos/orders.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Order } from '../entities/order.entity';
@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async findAll(filterParams: FilterOrdersDto) {
    if (filterParams) {
      const filters: FilterQuery<Order> = {};
      const { limit, offset } = filterParams;
      const orders = await this.orderModel
        .find(filters)
        .skip(offset)
        .limit(limit)
        .populate('brand');
      return orders;
    }
    return await this.orderModel.find().populate('brand').exec();
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id).populate('brand');
    if (!order) throw new NotFoundException('El ordero:' + id + 'no existe');
    return order;
  }

  async create(order: CreateOrderDto) {
    const newOrder = new this.orderModel({
      ...order,
    });
    return newOrder.save();
  }

  async updateOne(id: any, dataOrder: UpdateOrderDto) {
    const orderExist = await this.orderModel.findByIdAndUpdate(
      { _id: id },
      dataOrder,
      { new: true },
    );
    return orderExist;
  }

  async deleteOne(id: any) {
    const order = await this.orderModel.findById(id);
    if (!order) throw new NotFoundException('El ordero:' + id + 'no existe');
    return await this.orderModel.findByIdAndDelete(id);
  }
}

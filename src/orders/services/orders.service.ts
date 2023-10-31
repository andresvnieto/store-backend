import { Injectable, NotFoundException } from '@nestjs/common';
import {
  AddProductsToOrder,
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
        .populate('products customer');
      return orders;
    }
    return await this.orderModel.find().exec();
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id).populate('products');
    if (!order) throw new NotFoundException('El order:' + id + 'no existe');
    return order;
  }

  async create(order: CreateOrderDto) {
    const newOrder = new this.orderModel({
      ...order,
    });
    return newOrder.save();
  }

  async updateOne(id: string, dataOrder: UpdateOrderDto) {
    const newOrder = await this.orderModel
      .findByIdAndUpdate(id, { $set: dataOrder }, { new: true })
      .exec();
    return newOrder;
  }

  async deleteOne(id: any) {
    const order = await this.orderModel.findById(id);
    if (!order) throw new NotFoundException('El order:' + id + 'no existe');
    return await this.orderModel.findByIdAndDelete(id);
  }

  async removeProduct(orderId: string, productId: string) {
    const order = await this.findOne(orderId);
    if (!order)
      throw new NotFoundException('El order:' + orderId + 'no existe');
    order.products.pull(productId);
    return order.save();
  }

  async addProducts(orderId: string, products: AddProductsToOrder) {
    const order = await this.findOne(orderId);
    if (!order)
      throw new NotFoundException('El order:' + orderId + 'no existe');
    products.productsIds.forEach((product) => order.products.push(product));
    return order.save();
  }
}

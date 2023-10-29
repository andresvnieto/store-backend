import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Customer } from '../entities/customer.entity';
import {
  CreateCustomerDto,
  FilterCustomersDto,
  UpdateCustomerDto,
} from '../dtos/customers.dto';
@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async findAll(filterParams: FilterCustomersDto) {
    if (filterParams) {
      const filters: FilterQuery<Customer> = {};
      const { limit, offset } = filterParams;
      const customers = await this.customerModel
        .find(filters)
        .skip(offset)
        .limit(limit);
      return customers;
    }
    return await this.customerModel.find().exec();
  }

  async findOne(id: string) {
    const customer = await this.customerModel.findById(id);
    if (!customer)
      throw new NotFoundException('El customero:' + id + 'no existe');
    return customer;
  }

  async create(customer: CreateCustomerDto) {
    const newCustomer = new this.customerModel({ ...customer });
    return newCustomer.save();
  }

  async updateOne(id: any, dataCustomer: UpdateCustomerDto) {
    const customerExist = await this.customerModel.findByIdAndUpdate(
      { _id: id },
      dataCustomer,
      { new: true },
    );
    return customerExist;
  }

  async deleteOne(id: any) {
    const customer = await this.customerModel.findById(id);
    if (!customer)
      throw new NotFoundException('El customero:' + id + 'no existe');
    return await this.customerModel.findByIdAndDelete(id);
  }
}

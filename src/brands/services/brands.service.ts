import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateBrandDto,
  FilterBrandsDto,
  UpdateBrandDto,
} from '../dtos/brands.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Brand } from '../entities/brand.entity';
@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async findAll(filterParams: FilterBrandsDto) {
    if (filterParams) {
      const filters: FilterQuery<Brand> = {};
      const { limit, offset } = filterParams;
      const products = await this.brandModel
        .find(filters)
        .skip(offset)
        .limit(limit);
      return products;
    }
    return await this.brandModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.brandModel.findById(id);
    if (!product)
      throw new NotFoundException('El producto:' + id + 'no existe');
    return product;
  }

  async create(product: CreateBrandDto) {
    const newBrand = new this.brandModel({
      ...product,
    });
    return newBrand.save();
  }

  async updateOne(id: any, dataBrand: UpdateBrandDto) {
    const productExist = await this.brandModel.findByIdAndUpdate(
      { _id: id },
      dataBrand,
      { new: true },
    );
    return productExist;
  }

  async deleteOne(id: any) {
    const product = await this.brandModel.findById(id);
    if (!product)
      throw new NotFoundException('El producto:' + id + 'no existe');
    return await this.brandModel.findByIdAndDelete(id);
  }
}

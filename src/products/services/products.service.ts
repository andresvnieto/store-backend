import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Product } from '../entities/product.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(filterParams: FilterProductsDto) {
    if (filterParams) {
      const filters: FilterQuery<Product> = {};
      const { limit, offset, minPrice, maxPrice } = filterParams;
      if (minPrice && maxPrice) {
        filters.price = {
          $gte: minPrice,
          $lte: maxPrice,
        };
      }
      const products = await this.productModel
        .find(filters)
        .skip(offset)
        .limit(limit)
        .populate('brand');
      return products;
    }
    return await this.productModel.find().populate('brand').exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).populate('brand');
    if (!product)
      throw new NotFoundException('El producto:' + id + 'no existe');
    return product;
  }

  async create(product: CreateProductDto) {
    const newProduct = new this.productModel({
      ...product,
    });
    return newProduct.save();
  }

  async updateOne(id: any, dataProduct: UpdateProductDto) {
    const productExist = await this.productModel.findByIdAndUpdate(
      { _id: id },
      dataProduct,
      { new: true },
    );
    return productExist;
  }

  async deleteOne(id: any) {
    const product = await this.productModel.findById(id);
    if (!product)
      throw new NotFoundException('El producto:' + id + 'no existe');
    return await this.productModel.findByIdAndDelete(id);
  }
}

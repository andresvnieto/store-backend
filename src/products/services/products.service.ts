import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Db } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../entities/product.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(offset: number, limit: number) {
    const products = await this.productModel.find().exec();
    const copyProducts = [...products];

    if (offset > products.length || offset < 0) {
      offset = 0;
    }

    if (limit + offset > products.length) {
      limit = products.length;
    }

    if (limit + offset < 0) limit = 0;

    const limitProducts = copyProducts.slice(offset, limit + offset);

    if (limitProducts.length > 0) {
      return limitProducts;
    } else {
      return products;
    }
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
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

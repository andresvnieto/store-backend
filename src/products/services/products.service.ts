import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Db } from 'mongodb';
@Injectable()
export class ProductsService {
  constructor(@Inject('MONGO') private database: Db) {}

  async findAll(offset: number, limit: number) {
    const productsCollection = await this.database.collection('products');
    const products = await productsCollection.find().toArray();
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

  async findOne(id: number) {
    const productsCollection = await this.database.collection('products');
    const product = productsCollection.findOne((item) => item.id === id);
    if (!product)
      throw new NotFoundException('El producto:' + id + 'no existe');
    return product;
  }

  async create(product: CreateProductDto) {
    const productsCollection = await this.database.collection('products');
    const newProduct = {
      ...product,
    };
    return productsCollection.insertOne(newProduct);
  }

  async updateOne(id: any, dataProduct: UpdateProductDto) {
    const productsCollection = await this.database.collection('products');
    const productExist = await productsCollection.findOneAndUpdate(
      { _id: id },
      dataProduct,
    );
    return productExist;
  }

  async deleteOne(id: any) {
    const productsCollection = await this.database.collection('products');
    return productsCollection.findOneAndDelete(id);
  }
}

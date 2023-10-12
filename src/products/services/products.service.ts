import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
@Injectable()
export class ProductsService {
  private counterId = 0;
  private products: Product[] = [
    {
      id: 0,
      name: 'Producto 1',
      description: 'Lorem ipsum dolor',
      price: 12000,
      image: 'asd',
      stock: 23,
    },
  ];

  findAll(offset: number, limit: number) {
    const copyProducts = [...this.products];

    console.log(offset, limit);

    if (offset > this.products.length || offset < 0) {
      offset = 0;
    }

    if (limit + offset > this.products.length) {
      limit = this.products.length;
    }

    if (limit + offset < 0) limit = 0;

    const limitProducts = copyProducts.slice(offset, limit + offset);

    console.log(limitProducts);

    if (limitProducts.length > 0) {
      return limitProducts;
    } else {
      return this.products;
    }
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product)
      throw new NotFoundException('El producto:' + id + 'no existe');
    return product;
  }

  create(product: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateOne(id: number, dataProduct: UpdateProductDto) {
    const productExist = this.findOne(id);
    if (productExist) {
      const index = this.products.findIndex((item) => item.id === id);
      const product = this.products[index];
      const updatedProduct = { ...product, ...dataProduct };
      this.products[index] = updatedProduct;
      return updatedProduct;
    } else {
      return null;
    }
  }

  deleteOne(id: number) {
    const productExist = this.findOne(id);
    if (productExist) {
      const newProducts = this.products.filter((item) => {
        return item.id !== id;
      });
      this.products = newProducts;
      return this.products;
    } else {
      return null;
    }
  }
}

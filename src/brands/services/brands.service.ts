import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

@Injectable()
export class BrandsService {
  private counterId = 0;
  private brands: Brand[] = [
    {
      id: 0,
      name: 'Brando 1',
      description: 'Lorem ipsum dolor',
      image: 'asd',
    },
  ];

  findAll(offset: number, limit: number) {
    const copyBrands = [...this.brands];

    console.log(offset, limit);

    if (offset > this.brands.length || offset < 0) {
      offset = 0;
    }

    if (limit + offset > this.brands.length) {
      limit = this.brands.length;
    }

    if (limit + offset < 0) limit = 0;

    const limitBrands = copyBrands.slice(offset, limit + offset);

    console.log(limitBrands);

    if (limitBrands.length > 0) {
      return limitBrands;
    } else {
      return this.brands;
    }
  }

  findOne(id: number) {
    const brand = this.brands.find((item) => item.id === id);
    if (!brand) throw new NotFoundException('El brando:' + id + 'no existe');
    return brand;
  }

  create(brand: CreateBrandDto) {
    this.counterId = this.counterId + 1;
    const newBrand = {
      id: this.counterId,
      ...brand,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  updateOne(id: number, dataBrand: UpdateBrandDto) {
    const brandExist = this.findOne(id);
    if (brandExist) {
      const index = this.brands.findIndex((item) => item.id === id);
      const brand = this.brands[index];
      const updatedBrand = { ...brand, ...dataBrand };
      this.brands[index] = updatedBrand;
      return updatedBrand;
    } else {
      return null;
    }
  }

  deleteOne(id: number) {
    const brandExist = this.findOne(id);
    if (brandExist) {
      const newBrands = this.brands.filter((item) => {
        return item.id !== id;
      });
      this.brands = newBrands;
      return this.brands;
    } else {
      return null;
    }
  }
}

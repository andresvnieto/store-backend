import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/users.dto';

@Injectable()
export class UsersService {
  private counterId = 0;
  private users: Product[] = [
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
    const copyUsers = [...this.users];

    console.log(offset, limit);

    if (offset > this.users.length || offset < 0) {
      offset = 0;
    }

    if (limit + offset > this.users.length) {
      limit = this.users.length;
    }

    if (limit + offset < 0) limit = 0;

    const limitUsers = copyUsers.slice(offset, limit + offset);

    console.log(limitUsers);

    if (limitUsers.length > 0) {
      return limitUsers;
    } else {
      return this.users;
    }
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) throw new NotFoundException('El usero:' + id + 'no existe');
    return user;
  }

  create(user: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...user,
    };
    this.users.push(newProduct);
    return newProduct;
  }

  updateOne(id: number, dataProduct: UpdateProductDto) {
    const userExist = this.findOne(id);
    if (userExist) {
      const index = this.users.findIndex((item) => item.id === id);
      const user = this.users[index];
      const updatedProduct = { ...user, ...dataProduct };
      this.users[index] = updatedProduct;
      return updatedProduct;
    } else {
      return null;
    }
  }

  deleteOne(id: number) {
    const userExist = this.findOne(id);
    if (userExist) {
      const newUsers = this.users.filter((item) => {
        return item.id !== id;
      });
      this.users = newUsers;
      return this.users;
    } else {
      return null;
    }
  }
}

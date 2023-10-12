import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

@Injectable()
export class UsersService {
  constructor() {}
  private counterId = 0;
  private users: User[] = [
    {
      id: 0,
      name: 'Usero 1',
      email: 'asdasd@gmail.com',
      orders: [
        {
          id: 0,
          description: 'Lorem ipsum dolor',
          date: new Date(),
        },
      ],
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

  create(user: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      orders: [],
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateOne(id: number, dataUser: UpdateUserDto) {
    const userExist = this.findOne(id);
    if (userExist) {
      const index = this.users.findIndex((item) => item.id === id);
      const user = this.users[index];
      const updatedUser = { ...user, ...dataUser };
      this.users[index] = updatedUser;
      return updatedUser;
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

  getOrdersByUser(id: number): Order[] {
    const userExist = this.findOne(id);
    if (!userExist) throw new NotFoundException('El usuario no existe');
    return userExist.orders;
  }
}

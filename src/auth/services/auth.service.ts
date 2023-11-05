import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/services/users.service';
import { User } from 'src/users/entities/user.entity';
import { TokenPayload } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch && user) {
      const { password, ...rest } = user.toJSON();
      return rest;
    }
    return null;
  }

  async login(user: User) {
    const payload: TokenPayload = {
      email: user.email,
      sub: user._id,
      role: user.role,
    };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}

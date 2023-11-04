import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;
    //   throw new UnauthorizedException('Las credenciales no son válidas');
    return user;
  }
}

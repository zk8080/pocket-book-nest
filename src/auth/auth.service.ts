import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // 生成token
  createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  login(user: Partial<User>) {
    const token = this.createToken({
      id: user.id,
      username: user.username,
    });

    return { token };
  }

  create(createAuthDto: LoginDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

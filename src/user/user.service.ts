import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

export interface UserRo {
  list: User[];
  count: number;
}
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 注册
  async register(createUser: CreateUserDto) {
    const { username } = createUser;

    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if(existUser){
        throw new HttpException("用户名已存在", HttpStatus.BAD_REQUEST)
    }

    const newUser = await this.userRepository.create(createUser)
    return await this.userRepository.save(newUser);
  }

  // 获取用户列表
  async findAll(query): Promise<UserRo> {
    const qb = await getRepository(User).createQueryBuilder('user');
    qb.where('1 = 1');
    qb.orderBy('user.create_time', 'DESC');

    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const userList = await qb.getMany();
    return { list: userList, count: count };
  }
}

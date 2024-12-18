import { Injectable } from '@nestjs/common';
import { User } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './entity/roles.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * 根据邮箱查找用户
   * @param name 邮箱
   * @returns 用户
   */
  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  /**
   * 创建用户
   * @param name
   * @param password
   * @param email
   * @param roles
   */
  async create(name: string, password: string, email: string, role: Roles) {
    const user = this.userRepository.create({
      name,
      password,
      email,
      roles: [role],
    });
    await this.userRepository.save(user);
  }
}

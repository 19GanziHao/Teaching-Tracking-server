import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { Roles } from 'src/user/entity/roles.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginResponseDto } from './dto/loginRepsonse.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
  ) {}

  /**
   * 登录
   * @param name 用户名
   * @param password 密码
   * @returns
   */
  async signIn(email: string, password: string): Promise<LoginResponseDto> {
    // 查询用户
    const user = await this.userService.findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user?.password || ''))) {
      throw new UnauthorizedException('邮箱或密码错误');
    }

    // 负载 用于 jwt 签名
    const payload = { sub: user.id, name: user.name };
    return {
      token: await this.jwtService.signAsync(payload, {
        expiresIn: '2d', // 过期时间
      }), // 生成token
      userId: user.id,
      name: user.name,
      email: user.email,
      roles: user.roles.map((item) => item.name),
    };
  }

  /**
   * 注册
   * @param registerDto
   */
  async register(registerDto: RegisterDto): Promise<void> {
    let { password } = registerDto;
    const { role: roleName, name, email } = registerDto;
    // 加密密码
    password = await genPwd(password);

    // 查找角色
    const role = await this.roleRepository.findOne({
      where: { name: roleName },
    });
    if (!role) {
      throw new Error(`Role "${roleName}" not found.`);
    }

    return this.userService.create(name, password, email, role);
  }
}

/**
 * 加密密码
 * @param pwd 明文密码
 * @returns 密文密码
 */
async function genPwd(pwd: string) {
  const saltRounds = 10; // 盐的生成强度
  return await bcrypt.hash(pwd, saltRounds);
}

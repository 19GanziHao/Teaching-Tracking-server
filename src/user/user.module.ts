import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 注册实体
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

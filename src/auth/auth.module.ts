import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/user/entity/roles.entity';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2 days' },
    }),
    TypeOrmModule.forFeature([Roles]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

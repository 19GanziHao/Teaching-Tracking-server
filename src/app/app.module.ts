import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';
import { UserModule } from 'src/user/user.module';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CourseModule,
    TypeOrmModule.forRootAsync({
      // 需引入config 因为需要的配置在其中
      imports: [ConfigModule],
      inject: [ConfigService],
      // 数据库的创建
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'mysql'>('db.mysql.type'),
        host: configService.get<string>('db.mysql.host'),
        port: configService.get<number>('db.mysql.port'),
        username: configService.get<string>('db.mysql.username'),
        password: configService.get<string>('db.mysql.password'),
        database: configService.get<string>('db.mysql.database'),
        autoLoadEntities: true,
        timezone: '+08:00', // 设置为中国时区
        entities: [],
        synchronize: false,
        namingStrategy: new SnakeNamingStrategy(), // 使用下划线命名策略,
      }),
      dataSourceFactory: async (options: DataSourceOptions) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    // setting config source
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () =>
          yaml.load(
            readFileSync(join(__dirname, '../../development.yaml'), 'utf8'),
          ) as Record<string, any>,
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

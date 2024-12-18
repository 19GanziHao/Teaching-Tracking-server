import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';
import { UserModule } from 'src/user/user.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'mysql'>('db.mysql.type'),
        host: configService.get<string>('db.mysql.host'),
        port: configService.get<number>('db.mysql.port'),
        username: configService.get<string>('db.mysql.username'),
        password: configService.get<string>('db.mysql.password'),
        database: configService.get<string>('db.mysql.database'),
        autoLoadEntities: true,
        entities: [],
        synchronize: false,
        namingStrategy: new SnakeNamingStrategy(), // 使用下划线命名策略,
      }),
      dataSourceFactory: async (options: DataSourceOptions) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
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

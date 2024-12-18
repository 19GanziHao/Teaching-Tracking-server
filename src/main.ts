import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AuthGuard } from './auth/guard/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ResultInterceptor } from './interceptor';
import { AllExceptionFilter } from './exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局守卫 中间件后 拦截器前触发
  app.useGlobalGuards(new AuthGuard(new JwtService(), new Reflector()));

  // 全局拦截器 规定返回格式
  app.useGlobalInterceptors(new ResultInterceptor());

  // 全局异常过滤器
  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

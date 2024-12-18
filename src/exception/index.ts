/**
 * 规定异常处理类
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500; // 如果不是 HttpException，则默认返回 500
    const message =
      exception instanceof HttpException
        ? exception.message
        : exception.message || 'Internal server error';
    // @todo 记录日志
    console.log(
      '%s %s error: %s',
      request.method,
      request.url,
      exception.message,
    );
    response.status(status).json({
      code: status,
      message,
      data: null,
    });
  }
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局路由器
  app.setGlobalPrefix('api');
  // 错误请求拦截器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 成功响应拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();

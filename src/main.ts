// import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/app.module';
import { NewrelicInterceptor } from './app/interceptors/new-relic-interceptor';

async function bootstrap() {
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new NewrelicInterceptor());

  await app.listen(PORT);
}
bootstrap();

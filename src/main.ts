import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = app.get(ConfigService).get<number>('PORT');
  // console.log(PORT);

  await app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
  });
}
bootstrap();

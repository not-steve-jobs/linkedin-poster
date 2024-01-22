import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { LoggerService } from './common/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggerService);
  app.useGlobalFilters(new AllExceptionsFilter(logger));

  await app.listen(3000);
}

void bootstrap().then(() => console.info('---------> APP STARTED'));

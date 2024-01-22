import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosterModule } from './poster/poster.module';
import { LinkedinModule } from './linkedin/linkedin.module';
import { PhotoSchema } from './photos/photo.schema';
import { LoggerModule } from './common/logger.module';
import { DatabaseModule } from './mongo/database.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_URL),
    MongooseModule.forFeature([{ name: 'Photo', schema: PhotoSchema }]),
    PosterModule,
    LinkedinModule,
    LoggerModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

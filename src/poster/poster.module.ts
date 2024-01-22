import { Module } from '@nestjs/common';
import { PosterController } from './poster.controller';
import { PosterService } from './poster.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PhotoModel } from '../photos/photo.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Photo', schema: PhotoModel }])],
  controllers: [PosterController],
  providers: [PosterService],
  exports: [PosterService],
})
export class PosterModule {}

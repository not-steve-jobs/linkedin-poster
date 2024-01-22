import { Injectable, NotFoundException } from '@nestjs/common';
import * as jimp from 'jimp';
import { ColorActionName } from '@jimp/plugin-color';
import { LoggerService } from '../common/logger.service';
import { Photo, PhotoModel } from '../photos/photo.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostGeneratedImageReqDto } from '../linkedin/dto/postGeneratedImage.req.dto';

@Injectable()
export class PosterService {
  constructor(
    private readonly logger: LoggerService,
    @InjectModel('Photo') private readonly modelModel: Model<Photo>,
  ) {}

  async generatePoster({
    poster,
    userId,
  }: PostGeneratedImageReqDto): Promise<Buffer> {
    try {
      const background = await jimp.read(poster.background);
      const picture = await this.adjustPictureColor(poster.picture, background);
      const font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
      const inputOrder = [
        'firstInput',
        'secondInput',
        'picture',
        'dummyContent',
      ];

      const sortedInputs = inputOrder.map((input) => poster[input]);

      const generatedPoster = await sortedInputs
        .reduce(async (image, input, index) => {
          const img = await image;

          if (index === 2) return img.composite(picture, 0, 0);
          else return img.print(font, 10, 10 + index * 40, input);
        }, Promise.resolve(background))
        .getBufferAsync(jimp.MIME_PNG);

      await PhotoModel.create({ userId, imageData: generatedPoster });

      return generatedPoster;
    } catch (error) {
      this.logger.error('Error generating poster', error.stack);
      throw new NotFoundException('Error generating poster');
    }
  }

  private async adjustPictureColor(
    pictureUrl: string,
    background: jimp,
  ): Promise<jimp> {
    const picture = await jimp.read(pictureUrl);

    picture.resize(background.getWidth(), background.getHeight());

    picture.color([{ apply: ColorActionName.MIX, params: ['#ffffff', 0.5] }]); // Blend with white, adjust as needed

    return picture;
  }
}

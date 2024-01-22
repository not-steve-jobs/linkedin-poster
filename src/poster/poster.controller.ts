import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PosterService } from './poster.service';
import { PostGeneratedImageReqDto } from '../linkedin/dto/postGeneratedImage.req.dto';
import { LoggerService } from '../common/logger.service';

@Controller('poster')
export class PosterController {
  constructor(
    private readonly posterService: PosterService,
    private readonly logger: LoggerService,
  ) {}

  @Post('generate')
  async generatePoster(
    @Body() dto: PostGeneratedImageReqDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const generatedPoster = await this.posterService.generatePoster(dto);

      res.set('Content-Type', 'image/png');
      res.status(HttpStatus.OK).send(generatedPoster);
    } catch (error) {
      this.logger.error('Poster Generation Error:', error.stack);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Error generating poster',
      });
    }
  }
}

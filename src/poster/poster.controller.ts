import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PosterService } from './poster.service';
import { PostGeneratedImageReqDto } from '../linkedin/dto/postGeneratedImage.req.dto';

@Controller('poster')
export class PosterController {
  constructor(private readonly posterService: PosterService) {}

  @Post('generate')
  async generatePoster(
    @Body() dto: PostGeneratedImageReqDto,
    @Res() res: Response,
  ): Promise<void> {
    const generatedPoster = await this.posterService.generatePoster(dto);

    res.set('Content-Type', 'image/png');
    res.status(HttpStatus.OK).send(generatedPoster);
  }
}

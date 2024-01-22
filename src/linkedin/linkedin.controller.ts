import { Body, Controller, Param, Post } from '@nestjs/common';
import { LinkedinService } from './linkedin.service';
import { PosterService } from '../poster/poster.service';
import { PostToLinkedInReqDto } from './dto/postToLinkedIn.req.dto';
import { AccessToken } from '../common/decorators/access-token.decorator';
import { PostGeneratedImageReqDto } from './dto/postGeneratedImage.req.dto';
import { LoggerService } from '../common/logger.service';

@Controller('linkedin')
export class LinkedinController {
  constructor(
    private readonly linkedinService: LinkedinService,
    private readonly posterService: PosterService,
    private readonly logger: LoggerService,
  ) {}

  @Post('authenticate/:code')
  async authenticateUser(@Param('code') code: string): Promise<any> {
    return this.linkedinService.authenticateUser(code);
  }

  @Post('post')
  async postToLinkedIn(
    @AccessToken() accessToken: string,
    @Body() dto: PostToLinkedInReqDto,
  ): Promise<any> {
    return this.linkedinService.postToLinkedIn(accessToken, dto.postData);
  }

  @Post('postGeneratedImage')
  async postGeneratedImage(
    @AccessToken() accessToken: string,
    @Body() dto: PostGeneratedImageReqDto,
  ): Promise<void> {
    const generatedPoster = await this.posterService.generatePoster(dto);

    await this.linkedinService.postToLinkedIn(accessToken, generatedPoster);
  }
}

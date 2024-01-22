import { Poster } from '../../poster/poster.model';
import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PostGeneratedImageReqDto {
  @IsNotEmpty()
  @Type(() => Poster)
  poster: Poster;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  userId: number;
}

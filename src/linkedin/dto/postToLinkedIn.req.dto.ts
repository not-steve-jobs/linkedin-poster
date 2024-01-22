import { IsNotEmpty } from 'class-validator';

export class PostToLinkedInReqDto {
  @IsNotEmpty()
  postData: any;
}

import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  text: string

  @IsString()
  @IsNotEmpty()
  author: string

  @IsString()
  @IsNotEmpty()
  article: string
}

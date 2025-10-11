import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() dto: CreateCommentDto) {
    return this.commentsService.create(dto)
  }

  @Get('article/:articleId')
  async findByArticle(@Param('articleId') articleId: string) {
    return this.commentsService.findByArticle(articleId)
  }
}
